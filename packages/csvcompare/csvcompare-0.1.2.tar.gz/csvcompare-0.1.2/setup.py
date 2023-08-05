# -*- coding: utf-8 -*-

import sys
from setuptools import setup, find_packages
from setuptools.command.test import test as TestCommand

class Tox(TestCommand):
    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True
    def run_tests(self):
        import tox
        errno = tox.cmdline(self.test_args)
        sys.exit(errno)

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

with open('README.rst') as f:
    readme = f.read()

with open('LICENSE') as f:
    license = f.read()

setup(
    name='csvcompare',
    version='0.1.2',
    description='CSV file diff and comparison',
    long_description=readme,
    author='Grant Jenks',
    author_email='contact@grantjenks.com',
    url='http://www.grantjenks.com/docs/csvcompare/',
    py_modules=['csvcompare'],
    package_data={'': ['LICENSE', 'README.rst']},
    install_requires=['jinja2'],
    tests_require=['tox', 'jinja2'],
    cmdclass={'test': Tox},
    license=license,
    classifiers=(
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'License :: OSI Approved :: Apache Software License',
        'Programming Language :: Python',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.2',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
    ),
)
