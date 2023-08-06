#!/usr/bin/python
# -*- coding: utf-8 -*-

from __future__ import with_statement

from setuptools import setup, find_packages


with open('VERSION') as fl:
    VERSION = fl.read().rstrip()

with open('README.rst') as fl:
    LONG_DESCRIPTION = fl.read()

with open('LICENSE') as fl:
    LICENSE = fl.read()

with open('requirements.txt') as fl:
    REQUIREMENTS = [row.strip() for row in fl]


setup(
    name='CurrencyConverter',
    version=VERSION,
    author='Alex Prengère',
    author_email='alexprengere@gmail.com',
    url='https://github.com/alexprengere/currencyconverter',
    description='A currency converter using the European Central Bank data.',
    long_description=LONG_DESCRIPTION,
    license=LICENSE,
    packages=find_packages(),
    include_package_data=True,
    install_requires=REQUIREMENTS,
    entry_points={
        'console_scripts' : [
            'currency_converter=currency_converter.currency_converter:main'
        ]
    },
)
