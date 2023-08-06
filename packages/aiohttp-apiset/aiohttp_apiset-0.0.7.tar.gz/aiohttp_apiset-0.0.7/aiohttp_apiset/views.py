import asyncio
import json
import os
import sys

from aiohttp import web
from aiohttp.web import Application
import yaml

from .swagger.loader import SwaggerLoaderMixin


class BaseApiSet:
    @classmethod
    def append_routes_to(cls, app: Application, prefix=None):
        raise NotImplementedError()


def swagger_yaml(file_path, *, executor=None, loop=None):
    if loop is None:
        loop = asyncio.get_event_loop()

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


class ApiSet(BaseApiSet, SwaggerLoaderMixin):
    prefix = '/api/'
    version = 1
    docs = '/docs/'
    namespace = ''
    swagger_file = 'swagger.yaml'
    default_response = 'json'
    actions = (
        ('options', 'OPTIONS', ''),
        ('create', 'POST', ''),
        ('post', 'POST', ''),
        ('put', 'PUT', ''),
        ('patch', 'PATCH', ''),
        ('list', 'GET', ''),
        ('get', 'GET', ''),
        ('retrieve', 'GET', '{id}/'),
        ('delete', 'DELETE', '{id}/'),
    )

    def __init__(self, app: Application, prefix=None):
        self.app = app
        if prefix:
            self.prefix = prefix

    @property
    def loop(self):
        return self.app.loop

    @asyncio.coroutine
    def options(self, request):
        return web.Response(body=b'')

    @asyncio.coroutine
    def data(self, request):
        if 'json' in request.content_type:
            data = yield from request.json()
        else:
            data = yield from request.post()
        return data

    @asyncio.coroutine
    def swagger(self, request):
        module_path = sys.modules[self.__module__].__file__
        swagger_file = os.path.join(
            os.path.dirname(module_path), self.swagger_file)
        return (yield from swagger_yaml(swagger_file)(request))

    def add_swagger_route(self, router, prefix=None, namespace=None):
        router.add_route(
            'GET',
            prefix + str(self.version) + self.docs + self.namespace,
            self.swagger,
            name=':'.join((namespace, 'swagger')),
        )

    def add_action_routes(self, router, prefix=None, namespace=None):
        url = prefix + str(self.version) + '/' + self.namespace + '/'
        for action_name, method, postfix_url in self.actions:
            action = getattr(self, action_name, None)
            if action:
                if method == 'OPTIONS':
                    name = None
                else:
                    name = ':'.join((namespace, action_name))
                router.add_route(method, url + postfix_url, action, name=name)

    def get_routes(self, base_url, namespace=None):
        if not namespace:
            namespace = namespace or self.namespace
            namespace = namespace.replace('/', '.')

        for action_name, method, postfix_url in self.actions:
            action = getattr(self, action_name, None)
            if action:
                yield {
                    'method': method,
                    'path': base_url + namespace + postfix_url,
                    'handler': action,
                    'name': ':'.join((namespace, action_name)),
                    'swagger_path': self.swagger_path,
                }

    @classmethod
    def append_routes_to(cls, app: Application, prefix=None):
        self = cls(app)
        prefix = prefix or self.prefix
        namespace = self.namespace.replace('/', '.')
        namespace = namespace.replace('{', '')
        namespace = namespace.replace('}', '')
        self.add_swagger_route(app.router, prefix, namespace)
        self.add_action_routes(app.router, prefix, namespace)

    def response(self, data=None, **kwargs):
        if isinstance(data, dict):
            data = data.copy()
        elif not data:
            data = {}
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
