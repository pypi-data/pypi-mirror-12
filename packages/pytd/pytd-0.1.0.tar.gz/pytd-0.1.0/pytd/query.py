
import datetime
import tdclient
import jinja2
import six

from six.moves import urllib

import logging
logger = logging.getLogger(__name__)

from .result import ResultProxy

class NotFoundError(Exception): pass


class Query(object):
    def __init__(self, context, database=None, query=None, source=None, result=None, priority=None, retry=None, type=None, pool=None):
        self.context = context
        self._database = database
        self._query = query
        self._source = source
        self._result = result
        self._priority = priority
        self._retry = retry
        self._type = type
        self._pool = pool

    @property
    def database(self):
        if self._database is None:
            raise TypeError("missing parameter: 'database'")
        return self._database

    @property
    def query(self):
        if self._query is None:
            raise TypeError("missing parameter: 'query'")
        return self._query

    @property
    def source(self):
        return self._source

    @property
    def result(self):
        return self._result

    @property
    def priority(self):
        return self._priority

    @property
    def retry(self):
        return self._retry

    @property
    def type(self):
        if self._type is None:
            return 'hive'
        return self._type

    def get_template(self):
        if self.source:
            env = jinja2.Environment(loader=self.context.template_loader)
            return env.get_template(self.source)
        else:
            return jinja2.Template(self.query)

    def render(self, variables=None):
        if variables is None:
            variables = {}
        if not isinstance(variables, dict):
            raise TypeError('dict-like object is expected: {0}'.format(variables))
        return self.get_template().render(variables)

    def get_result_url(self):
        obj = self.result
        if isinstance(obj, six.string_types):
            return obj
        if obj:
            return obj.get_result_url()
        return None

    def get_params(self):
        params = {
            'type': self.type,
            'db': self.database,
        }
        if self.result:
            params['result_url'] = self.get_result_url()
        if self.priority:
            params['priority'] = self.priority
        if self.retry:
            params['retry_limit'] = self.retry
        return params

    def run(self, variables=None, wait=False):
        api = self.context.client.api
        query = self.render(variables)
        job_id = api.query(query, **self.get_params())
        result = ResultProxy(self.context, job_id)
        if wait:
            result.wait()
        return result


class NamedQuery(Query):
    def __init__(self, context, name=None, cron=None, database=None, query=None, source=None, result=None, priority=None, retry=None, type=None, timezone=None, delay=None):
        self.context = context
        self._name = name
        self._cron = cron
        self._database = database
        self._query = query
        self._source = source
        self._result = result
        self._priority = priority
        self._retry = retry
        self._type = type
        self._timezone = timezone
        self._delay = delay

    @property
    def name(self):
        if self._name is None:
            if self.__class__ == NamedQuery:
                raise TypeError("missing parameter: 'name'")
            return "{0}.{1}".format(self.__class__.__module__, self.__class__.__name__)
        return self._name

    @property
    def cron(self):
        if self._cron is None:
            return ''
        return self._cron

    @property
    def timezone(self):
        return self._timezone

    @property
    def delay(self):
        return self._delay

    def get_params(self):
        params = {
            'cron': self.cron,
            'database': self.database,
            'type': self.type,
        }
        if self.result:
            params['result'] = self.get_result_url()
        if self.priority:
            params['priority'] = self.priority
        if self.retry:
            params['retry_limit'] = self.retry
        if self.timezone:
            params['timezone'] = self.timezone
        if self.delay:
            params['delay'] = self.delay
        return params

    def create_schedule(self, name, params=None):
        api = self.context.client.api
        # copied from td-client-python
        params = {} if params is None else params
        params.update({"type": params.get("type", "hive")})
        with api.post("/v3/schedule/create/%s" % (urllib.parse.quote(str(name))), params) as res:
            code, body = res.status, res.read()
            if code != 200:
                api.raise_error("Create schedule failed", res, body)

    def save(self, variables=None):
        api = self.context.client.api
        params = self.get_params()
        params['query'] = self.render(variables)
        try:
            api.update_schedule(self.name, params)
        except tdclient.api.NotFoundError:
            self.create_schedule(self.name, params)

    def delete(self):
        api = self.context.client.api
        api.delete_schedule(self.name)

    def run(self, variables=None, wait=False, scheduled_time=None):
        if scheduled_time is None:
            scheduled_time = datetime.datetime.now().replace(microsecond=0)
        # save query before running
        self.save(variables)
        # run query
        api = self.context.client.api
        for job_id, type, scheduled_at in api.run_schedule(self.name, scheduled_time):
            result = ResultProxy(self.context, job_id)
            if wait:
                result.wait()
            return result
