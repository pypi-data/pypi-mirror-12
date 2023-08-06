# coding:utf-8

"""
permission
~~~~~~~~~~~~~~~~

permission.json struct:

    {
        "user_role": {
            "resource": "res_role"
        },
        "user_role": {
            "resource": "owner"
        },
        "user_role": {
            "resource": "other"
        }
    }

resource.json struct::

    {
        "resource": {
            "other": ["actions"],
            "res_role": ["action"]
        }
    }

- resource is lowercase
- resource.json is for programer
- permission.json is for website manager, and can be changed via UI
- owner, other are special res_role, owner means all actions
- every one can access other actions, needn't add that ctions to every res_role
"""
from __future__ import unicode_literals
from __future__ import absolute_import

import json
import codecs
import copy
from flask import abort
from flask_restaction import pattern_action, Resource, schema


def load_config(resource_json, permission_json):
    """load resource.json and permission.json

    :param resource_json: path of resource.json
    :param permission_json: path of permission.json
    """
    try:
        with open(resource_json) as f_resource, open(permission_json) as f_permission:
            resource = json.load(f_resource, encoding="utf-8")
            permission = json.load(f_permission, encoding="utf-8")
    except IOError as e:
        e.strerror = 'Unable to load configuration file (%s)' % e.strerror
        raise
    return resource, permission


def parse_config(resource, permission):
    """parse resource and permission, make it easy to use

    :param resource: dict from resource.json
    :param permission: dict from permission.json
    :return:

        {
            (user_role, resource): (res_role, ["actions"])
        }
    """
    result = {}
    for user_role in permission:
        for resource_name, res_role in permission[user_role].items():
            assert resource_name.islower(), \
                "resource should in lowercase: %s" % resource_name
            res = resource[resource_name]
            if res_role != "owner" and res_role != "other":
                assert res_role in res, \
                    "res_role %s.%s not exists" % (resource_name, res_role)
            actions = list(set(res.get(res_role, []) + res.get("other", [])))
            for action in actions:
                assert pattern_action.match(action), \
                    "invalid action: %s.%s" % (resource_name, action)
            result[(user_role, resource_name)] = (res_role, actions)
    # user_role is None, for anonymous user
    for resource_name in resource:
        result[(None, resource_name)] = \
            ("other", resource[resource_name].get("other", []))
    return result


def permit(config, user_role, resource, action):
    """
    :return: (permit, res_role)
    """
    result = config.get((user_role, resource))
    if result is None:
        # get res_role of anonymous user
        result = config.get((None, resource))
    if result is None:
        return (False, None)
    res_role, actions = result
    if res_role == "owner":
        return (True, res_role)
    else:
        return (action in actions, res_role)


class Permission(Resource):

    """Permission

    res_role中owner权限最高，other权限最低

    json struct of get::

        {
            "permission": {
                "user_role": {
                    "resource": "res_role",
                    ...
                },
                ...
            }
            "resources": {
                "resource": ["res_role", ...],
                ...
            }
        }

    json struct of post::

        {
            "user_role": "user_role"
            "resources": {
                "resource": "res_role",
                ...
            }
        }
    """
    user_role = "unicode&required", None, "角色"
    resource = "unicode&required"
    action = "unicode&required"

    permit = "bool&required"
    message = "unicode&required"
    permission_item = {
        "user_role": {
            "validate": "unicode",
            "desc": "user_role",
            "required": True
        },
        "resources": {
            "validate": "any",
            "desc": "resource:res_role",
            "required": True
        }
    }

    schema_inputs = {
        "get_permit": schema("user_role", "resource", "action"),
        "post": permission_item,
        "delete": schema("user_role"),
    }
    schema_outputs = {
        "get_permit": schema("permit"),
        "post": schema("message"),
        "delete": schema("message"),
    }

    def __init__(self, api):
        self.api = api

    def get_permit(self, user_role, resource, action):
        """判断角色是否有对应的权限
        """
        p, res_role = permit(self.api.permission_config,
                             user_role, resource, action)
        return {"permit": p}

    def get(self):
        """获取permission配置信息
        """
        resources = {
            resource: list(set(list(res_roles) + ["owner", "other"]))
            for resource, res_roles in self.api.permission_resource.items()
        }
        return {
            "resources": resources,
            "permission": self.api.permission_permission
        }

    def post(self, user_role, resources):
        """添加角色或修改角色"""
        permission = copy.deepcopy(self.api.permission_permission)
        permission.setdefault(user_role, {})
        try:
            permission[user_role].update(resources)
        except Exception as ex:
            abort(400, ex.message)
        self._save_permission(permission)
        return {"message": "OK"}

    def delete(self, user_role):
        """删除角色
        """
        if user_role in self.api.permission_permission:
            permission = copy.deepcopy(self.api.permission_permission)
            del permission[user_role]
            self._save_permission(permission)
        return {"message": "OK"}

    def _save_permission(self, permission):
        try:
            config = parse_config(self.api.permission_resource, permission)
            with codecs.open(self.api.permission_json, "w", encoding="utf-8") as f:
                json.dump(permission, f, indent=4, ensure_ascii=False)
            self.api.permission_permission = permission
            self.api.permission_config = config
        except IOError as ex:
            abort(400, "can't save permission to file: %s" % ex)
        except AssertionError as ex:
            abort(400, ex.message)
