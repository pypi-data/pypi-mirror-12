#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import redis
import time

from zmon_worker_monitor.adapters.ifunctionfactory_plugin import IFunctionFactoryPlugin, propartial


# round to microseconds
ROUND_SECONDS_DIGITS = 6


class CounterFactory(IFunctionFactoryPlugin):

    def __init__(self):
        super(CounterFactory, self).__init__()

    def configure(self, conf):
        """
        Called after plugin is loaded to pass the [configuration] section in their plugin info file
        :param conf: configuration dictionary
        """
        return

    def create(self, factory_ctx):
        """
        Automatically called to create the check function's object
        :param factory_ctx: (dict) names available for Function instantiation
        :return: an object that implements a check function
        """
        return propartial(CounterWrapper, key_prefix='{}:{}:'.format(factory_ctx['check_id'], factory_ctx['entity_id']),
                          redis_host=factory_ctx['redis_host'], redis_port=factory_ctx['redis_port'])


class CounterWrapper(object):

    '''Measure increasing counts (per second) by saving the last value in Redis'''

    def __init__(self, key, redis_host, redis_port=6379, key_prefix=''):
        self.__con = redis.StrictRedis(redis_host, redis_port)
        self.key_prefix = key_prefix
        self.key(key)

    def key(self, key):
        '''expose key setter to allow reusing redis connection (CounterWrapper instance)'''

        self.__key = 'zmon:counters:{}{}'.format(self.key_prefix, key)
        # return self to allow method chaining
        return self

    def per_second(self, value):
        '''return increment rate of counter value (per second)'''

        olddata = self.__con.get(self.__key)
        result = 0
        now = time.time()
        if olddata:
            olddata = json.loads(olddata)
            time_diff = now - olddata['ts']
            value_diff = value - olddata['value']
            # do not allow negative values (important for JMX counters which will reset after restart/deploy)
            result = max(value_diff / time_diff, 0)
        newdata = {'value': value, 'ts': round(now, ROUND_SECONDS_DIGITS)}
        self.__con.set(self.__key, json.dumps(newdata))
        return result

    def per_minute(self, value):
        '''convenience method: returns per_second(..) / 60'''

        return self.per_second(value) / 60.0


if __name__ == '__main__':
    counter = CounterWrapper('test', 'localhost', 6379)
    print counter.per_second(1)
    time.sleep(2)
    print counter.per_second(101)
    time.sleep(1)
    print counter.per_second(111)
    time.sleep(1)
    print counter.per_minute(211)
