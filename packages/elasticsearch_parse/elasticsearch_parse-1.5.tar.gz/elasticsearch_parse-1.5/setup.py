#!/usr/bin/env python

#from distutils.core import setup, Command
from setuptools import setup,find_packages
import os
import os.path

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name='elasticsearch_parse',
    version='1.5',
    description='elasticsearch parse',
    long_description=open('README.md').read(),
    keywords = ["elasticsearch_parse","fengyun"],
    url='http://xiaorui.cc',
    author='ruifengyun',
    author_email='rfyiamcool@163.com',
    install_requires=['elasticsearch-dsl'],
    packages=['elasticsearch_parse'],
    license = "MIT",
    classifiers = [
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.0',
        'Topic :: Software Development :: Libraries :: Python Modules',
            ]
)
