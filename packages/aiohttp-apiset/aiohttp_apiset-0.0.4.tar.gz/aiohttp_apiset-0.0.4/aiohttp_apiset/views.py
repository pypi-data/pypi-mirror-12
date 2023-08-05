import asyncio
import json
import os
import sys

from aiohttp import web
import yaml


def swagger_yaml(file_path, *, executor=None, loop=None):
    loop = loop or asyncio.get_event_loop()

    def response(request):
        with open(file_path) as f:
            data = yaml.load(f)
            return ApiSet.response_json(data)

    @asyncio.coroutine
    def aresponse(request):
        return (
            yield from loop.run_in_executor(
                executor, response, request))

    return aresponse


class ApiSet:
    prefix = '/api/'
    version = 1
    docs = '/docs/'
    namespace = ''
    swagger_file = 'swagger.yaml'
    default_response = 'json'
    actions = (
        ('create', 'POST', ''),
        ('post', 'POST', ''),
        ('list', 'GET', ''),
        ('get', 'GET', ''),
        ('retrieve', 'GET', '{id}/'),
    )

    @asyncio.coroutine
    def swagger(self, request):
        module_path = sys.modules[self.__module__].__file__
        swagger_file = os.path.join(
            os.path.dirname(module_path), self.swagger_file)
        return (yield from swagger_yaml(swagger_file)(request))

    def add_swagger_route(self, router, prefix=None):
        router.add_route(
            'GET',
            prefix + str(self.version) + self.docs + self.namespace,
            self.swagger,
            name=':'.join((self.namespace, 'swagger')),
        )

    def add_action_routes(self, router, prefix=None):
        url = prefix + str(self.version) + '/' + self.namespace + '/'
        for action_name, method, postfix_url in self.actions:
            action = getattr(self, action_name, None)
            if action:
                router.add_route(
                    method, url + postfix_url, action,
                    name=':'.join((self.namespace, action_name)),
                )

    @classmethod
    def append_routes_to(cls, router, prefix=None):
        self = cls()
        prefix = prefix or self.prefix
        self.add_swagger_route(router, prefix)
        self.add_action_routes(router, prefix)

    def response(self, data, **kwargs):
        if isinstance(data, dict):
            data = data.copy()
        else:
            data = {'data_text': str(data)}
        data.update(kwargs)
        return getattr(
            self,
            'response_' + self.default_response,
        )(data, **kwargs)

    @classmethod
    def response_json(cls, data, **kwargs):
        data = json.dumps(
            data,
            indent=3,
            ensure_ascii=False,
        )
        return web.Response(
            body=data.encode(),
            content_type='application/json; charset=utf-8',
            status=kwargs.get('status', 200),
        )
