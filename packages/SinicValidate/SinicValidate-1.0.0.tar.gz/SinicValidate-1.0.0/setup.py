# -*- coding: utf-8 -*-

from __future__ import with_statement
from setuptools import setup


version = '1.0.0'


setup(
    name='SinicValidate',
    version=version,
    keywords='',
    description="Red Packets Split Algorithm",
    long_description=open('README.rst').read(),

    url='https://github.com/Brightcells/SinicValidate',

    author='Hackathon',
    author_email='kimi.huang@brightcells.com',

    packages=['SinicValidate'],
    py_modules=[],
    install_requires=[],

    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.5",
        "Programming Language :: Python :: 2.6",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3.2",
        "Programming Language :: Python :: 3.3",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
)
