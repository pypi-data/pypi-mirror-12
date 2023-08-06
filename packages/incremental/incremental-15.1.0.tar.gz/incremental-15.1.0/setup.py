#!/usr/bin/env python

from __future__ import absolute_import, division, print_function

import os, sys

from setuptools import setup

base_dir = os.path.dirname(__file__)
src_dir = os.path.join(base_dir, "src")

# We need to import outselves
sys.path.insert(0, src_dir)

import incremental

setup(
    name='incremental',
    version=incremental.__version__.base(),
    maintainer='Amber Brown',
    maintainer_email='hawkowl@twistedmatrix.com',
    url="https://github.com/hawkowl/incremental",
    classifiers = [
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.6",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.3",
        "Programming Language :: Python :: 3.4",
        "Programming Language :: Python :: 3.5",
    ],
    package_dir={"": "src"},
    py_modules=['incremental'],
    license="MIT",
    long_description=open('README.rst').read(),
    entry_points="""
    [distutils.setup_keywords]
    use_incremental = incremental:_get_version
    """,
)
