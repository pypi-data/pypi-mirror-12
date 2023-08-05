#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

DIR = os.path.dirname(os.path.abspath(__file__))

try:
    from setuptools import setup, find_packages
except ImportError:
    from distutils.core import setup, find_packages

from populus import __version__ as version


readme = open(os.path.join(DIR, 'README.md')).read()


setup(
    name='populus',
    version=version,
    description="""Ethereum Development Framework""",
    long_description=readme,
    author='Piper Merriam',
    author_email='pipermerriam@gmail.com',
    url='https://github.com/pipermerriam/populus',
    include_package_data=True,
    py_modules=['populus'],
    install_requires=[
        "click>=5.0",
        "pyethash>=0.1.27",
        "ethereum>=0.9.73",
        "requests>=2.7.0",
        "eth-testrpc>=0.1.16",
        "pytest>=2.6.2",
        "ethereum-rpc-client>=0.2.2",
        "watchdog>=0.8.3",
        "Flask>=0.10.1",
        "toposort>=1.4",
        "readline>=6.2.0.0",
    ],
    license="MIT",
    zip_safe=False,
    entry_points={
        'console_scripts': ["populus=populus.cli:main"],
        'pytest11': ['ethereum=populus.plugin'],
    },
    keywords='ethereum pytest',
    packages=find_packages(exclude=["tests", "tests.*"]),
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
    ],
)
