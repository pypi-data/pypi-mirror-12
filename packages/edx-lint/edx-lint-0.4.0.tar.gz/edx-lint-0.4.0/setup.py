#!/usr/bin/env python

from setuptools import setup

setup(
    name='edx-lint',
    version='0.4.0',
    description='edX-authored pylint checkers',
    url='https://github.com/edx/edx-lint',
    author='edX',
    author_email='oscm@edx.org',
    license='Apache',

    packages=[
        'edx_lint',
        'edx_lint.cmd',
        'edx_lint.pylint',
    ],

    package_data={
        'edx_lint': [
            'files/*',
        ],
    },

    entry_points={
        'console_scripts': [
            'edx_lint = edx_lint.cmd.main:main',
        ],
    },

    install_requires=[
        'pylint>=1.5.1,<1.6.0',
        'pylint-django>=0.7.1,<1.0.0',
    ],
)
