
import os
import unittest
from django.conf import settings
from pylint.testutils import make_tests, LintTestUsingFile, cb_test_gen, linter


settings.configure()


HERE = os.path.dirname(os.path.abspath(__file__))


linter.load_plugin_modules(['pylint_django'])


def module_exists(module_name):
    try:
        __import__(module_name)
    except ImportError:
        return False
    else:
        return True


def tests(input_dir, messages_dir):
    callbacks = [cb_test_gen(LintTestUsingFile)]

    input_dir = os.path.join(HERE, input_dir)
    messages_dir = os.path.join(HERE, messages_dir)

    return make_tests(input_dir, messages_dir, None, callbacks)


def suite():
    test_list = tests('input', 'messages')
    
    if module_exists('rest_framework'):
        test_list += tests('external_drf', '')

    return unittest.TestSuite([unittest.makeSuite(test, suiteClass=unittest.TestSuite)
                               for test in test_list])

if __name__=='__main__':
    unittest.main(defaultTest='suite')
