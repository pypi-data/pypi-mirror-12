#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from setuptools import find_packages, setup

import fabric_vms

requires = ['fabric>=1.10,<2']

README = open('README.rst').read()
CHANGELOG = open('changelog.rst').read()


setup(
    name='fabric_vms',
    version=fabric_vms.__version__,
    url='https://github.com/fernandezcuesta/fabric_vms',
    license="MIT",
    author='JM Fernández',
    author_email='fernandez.cuesta@gmail.com',
    description='An addon for managing OpenVMS hosts with fabric',
    long_description=README + '\n' + CHANGELOG,
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires,
    platforms='all',
    classifiers=[
         'Development Status :: 4 - Beta',
         'Environment :: Console',
         'License :: OSI Approved :: GNU Affero General Public License v3',
         'Operating System :: OS Independent',
         'Programming Language :: Python :: 2 :: Only',
         'Topic :: System :: Systems Administration',
    ],
    test_suite='tests',
)
