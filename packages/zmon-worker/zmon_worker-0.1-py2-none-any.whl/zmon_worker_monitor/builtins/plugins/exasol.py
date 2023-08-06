#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Query Exasol
"""

import tempfile
import subprocess
import os

from zmon_worker_monitor.adapters.ifunctionfactory_plugin import IFunctionFactoryPlugin, propartial


class ExaplusFactory(IFunctionFactoryPlugin):

    def __init__(self):
        super(ExaplusFactory, self).__init__()
        # fields from config
        self._exacrm_cluster = None
        self._exacrm_user = None
        self._exacrm_pass = None

    def configure(self, conf):
        """
        Called after plugin is loaded to pass the [configuration] section in their plugin info file
        :param conf: configuration dictionary
        """
        self._exacrm_cluster = conf['exacrm_cluster']
        self._exacrm_user = conf['exacrm_user']
        self._exacrm_pass = conf['exacrm_pass']

    def create(self, factory_ctx):
        """
        Automatically called to create the check function's object
        :param factory_ctx: (dict) names available for Function instantiation
        :return: an object that implements a check function
        """
        return propartial(ExaplusWrapper, cluster=self._exacrm_cluster, password=self._exacrm_pass,
                          user=self._exacrm_user)


class ExaplusWrapper(object):

    def __init__(self, cluster, user='ZALANDO_NAGIOS', password='', schema=False):
        self._err = None
        self._out = None
        self.user = user
        self.__password = password
        self.cluster = cluster
        self.schema = schema
        self.java_opts = ['-Djava.net.preferIPv4Stack=true', '-Djava.awt.headless=true', '-Xmx512m', '-Xms128m']
        self.exaplus_opts = [
            '-recoverConnection',
            'OFF',
            '-retry',
            '0',
            '-lang',
            'EN',
            '-q',
            '-x',
            '-Q',
            '10',
            '-pipe',
        ]
        self.jar_file = '/server/exasol/exaplus/current/exaplus.jar'

    def query(self, query):
        fd, name = tempfile.mkstemp(suffix='.sql', text=True)
        try:
            fh = os.fdopen(fd, 'w')
            fh.write('%s\n' % query)
            fh.flush()

            cmd = ['/usr/bin/java']
            cmd.extend(self.java_opts)
            cmd.extend(['-jar', self.jar_file])
            cmd.extend(['-c', self.cluster])
            cmd.extend(['-u', self.user])
            cmd.extend(['-p', self.__password])
            cmd.extend(self.exaplus_opts)
            if self.schema:
                cmd.extend(['-s', self.schema])
            cmd.extend(['-f', name])
            # print "EXAPLUS="+" ".join(cmd)
            sub = subprocess.Popen(cmd, shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE, close_fds=True)
            d_out, d_err = sub.communicate()
            self._out = d_out
            self._err = d_err
        finally:
            os.unlink(name)
        return self

    def result(self):
        return self._out.split('\n'), self._err.split('\n')


if __name__ == '__main__':
    import sys
    exaplus = ExaplusWrapper(sys.argv[1], sys.argv[2], sys.argv[3])
    print exaplus.query('''select table_name, case when hours_between(systimestamp,last_export_success_time) < 24 then 'EXPORTED YESTERDAY (within 24 HOURS) - OK' else 'NOT EXPORTED within LAST 24 HOURS' end status, last_export_success_time LAST_EXPORT_TIME from STG.TARGET_LOADING_STATUS where table_name not in ('D_SHOP','F_CUSTOMER_SALES','F_PRODUCT_AVAILABILITY','F_UMS_CAMPAIGN_RESPONSE') order by 1 ;'''
                        ).result()
