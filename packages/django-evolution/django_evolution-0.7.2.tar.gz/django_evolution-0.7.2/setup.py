#!/usr/bin/env python
#
# Setup script for Django Evolution

from ez_setup import use_setuptools
use_setuptools()

from setuptools import setup, find_packages
from setuptools.command.test import test

import django_evolution


def run_tests(*args):
    import os
    os.system('tests/runtests.py')

test.run_tests = run_tests


PACKAGE_NAME = 'django_evolution'


# Build the package
setup(
    name=PACKAGE_NAME,
    version=django_evolution.__version__,
    description='A database schema evolution tool for the Django web framework.',
    url='http://code.google.com/p/django-evolution/',
    author='Ben Khoo',
    author_email='khoobks@westnet.com.au',
    maintainer='Christian Hammond',
    maintainer_email='christian@beanbaginc.com',
    packages=find_packages(exclude=['tests']),
    install_requires=[
        'Django>=1.4.10',
    ],
    include_package_data=True,
    classifiers=[
        'Development Status :: 4 - Beta',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Software Development',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ]
)
