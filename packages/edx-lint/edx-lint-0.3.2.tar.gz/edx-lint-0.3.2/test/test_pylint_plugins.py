"""Test main for edx-lint."""

import os
import unittest

from logilab.common import testlib


def load_tests(loader, tests, pattern):
    # Have to import this in the function, because the module does
    # initialization on import! ugh.
    from pylint.testutils import make_tests, LintTestUsingFile, cb_test_gen, linter

    # Load our plugin.
    linter.load_plugin_modules(['edx_lint.pylint'])

    # Configure the linter that runs the tests.

    # This line prevents pylint from complaining about missing __revision__ in
    # all the test files. But is this removing other required attributes that
    # maybe we do want to check for?
    linter.global_set_option('required-attributes', ())

    here = os.path.dirname(os.path.abspath(__file__))

    tests = make_tests(
        input_dir=os.path.join(here, 'input'),
        msg_dir=os.path.join(here, 'messages'),
        filter_rgx=None,
        callbacks=[cb_test_gen(LintTestUsingFile)],
    )

    cls = testlib.TestSuite
    return cls(unittest.makeSuite(test, suiteClass=cls) for test in tests)
