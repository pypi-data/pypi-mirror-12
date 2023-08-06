# coding:utf-8

"""
    flask_restaction.resource
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    .. versionadded:: 0.18.0
       Support tuple_like schema, The ``schema,parse_schema,combine_schema`` function was added.
"""

from __future__ import unicode_literals
from __future__ import absolute_import
import six

from functools import partial
from flask.views import View
from flask import request, make_response, current_app
from werkzeug.wrappers import Response as ResponseBase
from validater import validate
from validater import ProxyDict
from . import ResourceException, abort, exporters


class ResourceViewType(type):
    """Used to provide standalone callback functions
       for each actual Resource class::

        before_request_funcs
        after_request_funcs
        handle_error_func
    """
    def __new__(cls, name, bases, d):
        rv = type.__new__(cls, name, bases, d)
        rv.before_request_funcs = []
        rv.after_request_funcs = []
        # In order to aviod TypeError: unbound method
        # handle_error_func is list with just one item
        # 函数和方法是不同的：
        # 1. 将函数赋给class, class得到的是另一个对象（方法），
        # 这个方法是那个函数被包装之后的对象。
        # 2. 一般方法要使用实例调用，你用类直接调用，
        # 调用的只能是类方法或静态方法。
        rv.handle_error_func = []

        return rv


class Resource(six.with_metaclass(ResourceViewType, View)):

    """Resource代表一个资源

    - schema_inputs is a dict of scheams for validate inputs.
        it's key is method name
    - schema_outputs is a dict of scheams for validate outputs.
        it's key is method name
    - output_types is a list of custom type of outputs
        , the custom type object will be proxy by validater.ProxyDict
    - before_request_funcs is a list of functions::

        def fn():
            return (rv, [code, headers]) or None

    - after_request_funcs is a list of functions,
        Must return ``tuple(rv, code, headers)``::

            def fn(rv, code, headers):
                return (rv, code, headers) or None

    - handle_error_func is list with just one function::

        def fn(ex):
            return (rv, [code, headers])

    - user_role is function that return user_role::

        @staticmethod
        def user_role(user_id):
            return "role of user or None"
    """

    schema_inputs = {}
    schema_outputs = {}
    output_types = []

    @classmethod
    def _before_request(cls):
        """before_request"""
        for fn in cls.before_request_funcs:
            rv = fn()
            if rv is not None:
                return rv
        return None

    @classmethod
    def _after_request(cls, rv, code, headers):
        for fn in cls.after_request_funcs:
            rv, code, headers = fn(rv, code, headers)
        return rv, code, headers

    @classmethod
    def _handle_error(cls, ex):

        if cls.handle_error_func:
            rv = cls.handle_error_func[0](ex)
            if rv is not None:
                return rv
        if isinstance(ex, ResourceException):
            if ex.code >= 500 and not current_app.debug:
                return {"error": "interal server error"}, ex.code
            else:
                return ex.error, ex.code
        else:
            return None

    @classmethod
    def after_request(cls, f):
        """decorater"""
        cls.after_request_funcs.append(f)
        return f

    @classmethod
    def before_request(cls, f):
        """decorater"""
        cls.before_request_funcs.append(f)
        return f

    @classmethod
    def error_handler(cls, f):
        """decorater"""
        cls.handle_error_func = [f]
        return f

    def dispatch_request(self, *args, **kwargs):
        """preproccess request and dispatch request
        """
        try:
            # before_request
            rv = self._before_request()
            if rv is None:
                rv = self.full_dispatch_request(*args, **kwargs)
        except Exception as ex:
            rv = self._handle_error(ex)
            if rv is None:
                raise
        # after_request
        rv, code, headers = unpack(rv)
        rv, code, headers = self._after_request(rv, code, headers)
        if isinstance(rv, (ResponseBase, six.string_types)):
            return make_response(rv, code, headers)
        else:
            if rv is None:
                rv = {}
            mediatype = request.accept_mimetypes.best_match(
                exporters.keys(), default='application/json')
            export = exporters[mediatype]
            return export(rv, code, headers)

    def full_dispatch_request(self, *args, **kwargs):
        """actual dispatch request, validate inputs and outputs
        """
        fn = getattr(self, request.action, None)
        if fn is None:
            abort(404, 'Unimplemented action %r' % request.action)
        inputs = self.__class__.schema_inputs.get(request.action)
        outputs = self.__class__.schema_outputs.get(request.action)
        output_types = self.__class__.output_types
        method = request.method.lower()
        if inputs is not None:
            if method in ["get", "delete"]:
                data = request.args
            elif method in ["post", "put"]:
                if request.mimetype == 'application/json':
                    try:
                        data = request.get_json()
                    except:
                        abort(400, "Invalid json content")
                else:
                    data = request.form
            else:
                data = {}
            (errors, values) = validate(data, inputs)
            if errors:
                abort(400, dict(errors))
            else:
                rv = fn(**values)
        else:
            rv = fn()
        rv, code, headers = unpack(rv)
        if outputs is not None:
            if output_types and isinstance(rv, tuple(output_types)):
                (errors, values) = validate(ProxyDict(rv, output_types), outputs)
            else:
                (errors, values) = validate(rv, outputs)
            if errors:
                abort(500, dict(errors))
            else:
                rv = values
        return rv, code, headers


def unpack(rv):
    """convert rv to tuple(data, code, headers)

    :param rv: data or tuple that contain code and headers
    """
    status = headers = None
    if isinstance(rv, tuple):
        rv, status, headers = rv + (None,) * (3 - len(rv))
    if isinstance(status, (dict, list)):
        headers, status = status, headers
    return (rv, status, headers)


def parse_schema(info):
    """convert tuple_like schema to dict_like schema

    tuple_like schema can has 1~3 items: ``(validate&required, default, desc)``
    validate_required is needed, default and desc is opinion.
    validate_required is a string like ``"+int&required"``, the ``&required`` is opinion.

    For example::

        "+int&required", 1, "the page number"

    will be converted to::

        {
            "default": 1,
            "validate": "+int",
            "required": True,
            "desc": "the page number"
        }

    And::

        "+int", 1

    will be converted to::

        {
            "default": 1,
            "validate": "+int",
            "required": False
        }

    And::

        "+int", None, "the page number"

    will be converted to::

        {
            "validate": "+int",
            "required": False,
            "desc": "the page number"
        }

    And if the tuple_like schema is string::

        "+int&required"

    will be converted to::

        {
            "validate": "+int",
            "required": True
        }

    :param info: tuple_like schema
    """
    if isinstance(info, six.string_types):
        info = (info, None, None)
    else:
        info = info + (None,) * (3 - len(info))
    validate_required, default, desc = info
    validate_required = validate_required.split("&")
    validate = validate_required[0]
    if len(validate_required) == 2:
        assert validate_required[1] == "required", "invalid schema syntax"
        required = True
    else:
        required = False
    schema = {
        "validate": validate,
        "required": required,
    }
    if default is not None:
        schema["default"] = default
    if desc is not None:
        schema["desc"] = desc
    return schema


def combine_schema(scope, *args):
    """combine tuple_like validate schema from scope

    :param scope: a dict, such as Class.__dict__
    :param args: variable names or dicts
    """
    node = {}
    for x in args:
        # deal with x like: [[["name"]]]
        list_deep = 0
        while(isinstance(x, list)):
            assert len(x) == 1, "invalid schema: list's length must be 1"
            x = x[0]
            list_deep += 1
        info = scope[x]

        if six.callable(info):
            info = info(scope)
        elif isinstance(info, dict):
            info = info
        else:
            info = parse_schema(info)

        # wrap info with []
        if list_deep > 0:
            assert len(args) == 1, "can't combine list and others"
            while list_deep > 0:
                info = [info]
                list_deep -= 1
            return info
        node[x] = info
    return node


def schema(*args):
    """combine validate schema, return a function for doing combine later"""
    def lazy_combine(scope):
        return combine_schema(scope, *args)
    return lazy_combine
