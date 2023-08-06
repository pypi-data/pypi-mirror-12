#!/usr/bin/env python
# coding: utf-8
import unittest
import sys
from optparse import OptionParser
import logging
from copy import copy

from test.util import GLOBAL, start_server, stop_server
from weblib.watch import watch

# **********
# Grab Tests
# * pycurl transport
# * extensions
# **********

# TODO:
# * test redirect and response.url after redirect
GRAB_TEST_LIST = (
    # Internal API
    'test.grab_api',
    'test.grab_transport',
    'test.response_class',
    'test.grab_debug', # TODO: fix tests excluded for urllib3
    # Response processing
    'test.grab_xml_processing',
    'test.grab_response_body_processing',
    'test.grab_charset',
    'test.grab_redirect',
    # Network
    'test.grab_get_request',
    'test.grab_post_request',
    'test.grab_request', # TODO: fix tests excluded for urllib3
    'test.grab_user_agent',
    'test.grab_cookies', # TODO: fix tests excluded for urllib3
    'test.grab_url_processing',
    # Refactor
    'test.grab_proxy',
    'test.grab_upload_file',
    'test.grab_limit_option',
    'test.grab_charset_issue',
    'test.grab_pickle', # TODO: fix tests excluded for urllib3
    # *** Extension sub-system
    # *** Extensions
    'test.ext_text',
    'test.ext_rex',
    'test.ext_lxml',
    'test.ext_form',
    'test.ext_doc',
    'test.ext_structured',
    # *** Pycurl Test
    'test.pycurl_cookie',
    # *** util.module
    'test.util_module',
    'test.util_log',
    # *** grab.export
    'test.util_config',
    'test.script_crawl',
    #'test.script_start_project',
    'test.grab_error',
    'test.selector_deprecated',
    'test.grab_deprecated',
    'test.ext_pyquery',
    'test.tools_deprecated',
)

# ************
# Spider Tests
# ************

SPIDER_TEST_LIST = (
    'test.spider_task',
    'test.spider',
    'test.spider_proxy',
    'test.spider_queue',
    'test.spider_misc',
    'test.spider_meta',
    'test.spider_error',
    'test.spider_cache',
    'test.spider_data',
    'test.spider_stat',
    'test.spider_multiprocess',
)


def main():
    logging.basicConfig(level=logging.DEBUG)
    parser = OptionParser()
    parser.add_option('-t', '--test', help='Run only specified tests')
    parser.add_option('--transport', default='pycurl')
    parser.add_option('--test-grab', action='store_true',
                      default=False, help='Run tests for Grab::Spider')
    parser.add_option('--test-spider', action='store_true',
                      default=False, help='Run tests for Grab')
    parser.add_option('--test-all', action='store_true',
                      default=False,
                      help='Run tests for both Grab and Grab::Spider')
    parser.add_option('--backend-mongo', action='store_true',
                      default=False,
                      help='Run extra tests that depends on mongodb')
    parser.add_option('--backend-redis', action='store_true',
                      default=False,
                      help='Run extra tests that depends on redis')
    parser.add_option('--backend-mysql', action='store_true',
                      default=False,
                      help='Run extra tests that depends on mysql')
    parser.add_option('--backend-postgresql', action='store_true',
                      default=False,
                      help='Run extra tests that depends on postgresql')
    parser.add_option('--mp-mode', action='store_true', default=False,
                      help='Enable multiprocess mode in spider tests')
    parser.add_option('--profile', action='store_true', default=False,
                      help='Do profiling')
    opts, args = parser.parse_args()

    GLOBAL['transport'] = opts.transport

    if opts.backend_mongo:
        GLOBAL['backends'].append('mongo')

    if opts.backend_redis:
        GLOBAL['backends'].append('redis')

    if opts.backend_mysql:
        GLOBAL['backends'].append('mysql')

    if opts.backend_postgresql:
        GLOBAL['backends'].append('postgresql')

    test_list = []

    if opts.test_all:
        test_list += GRAB_TEST_LIST
        test_list += SPIDER_TEST_LIST

    if opts.test_grab:
        test_list += GRAB_TEST_LIST

    if opts.test_spider:
        test_list += SPIDER_TEST_LIST

    if opts.test:
        test_list += [opts.test]

    GLOBAL['mp_mode'] = opts.mp_mode

    # Check tests integrity
    # Ensure that all test modules are imported correctly
    for path in test_list:
        __import__(path, None, None, ['foo'])

    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    for path in test_list:
        mod_suite = loader.loadTestsFromName(path)
        for some_suite in mod_suite:
            for test in some_suite:
                if (not hasattr(test, '_backend') or
                        test._backend in GLOBAL['backends']):
                    suite.addTest(test)

    runner = unittest.TextTestRunner()
    #start_server()


    if opts.profile:
        import cProfile
        import pyprof2calltree
        import pstats

        profile_tree_file = 'var/test.prof.out'
        prof = cProfile.Profile()
        result = prof.runcall(runner.run, suite)
        stats = pstats.Stats(prof)
        stats.strip_dirs()
        pyprof2calltree.convert(stats, profile_tree_file)
    else:
        result = runner.run(suite)
    if result.wasSuccessful():
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()
