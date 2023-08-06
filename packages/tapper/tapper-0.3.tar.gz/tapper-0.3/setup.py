'''
Copyright (c) 2015-2016, Contributor
All rights reserved.

author: Takegami

'''


import os
import sys

from setuptools import setup, find_packages

py_version = sys.version_info[:2]

PY3 = py_version[0] == 3

if PY3:
    raise RuntimeError('Python3 is not supported.')
else:
    if py_version < (2, 6):
        raise RuntimeError('tapper supported Python 2.6 or better')

install_requires=[
    'setuptools',
    'jinja2',
    'html'
    ]

setup(name='tapper',
    keywords='tapper',
    version='0.3',
    description='Pepper tablet scafflod create tools.',
    author='Takegami Hiroyuki, Minabe Yoji, Yamamoto',
    license='BSD-derived (http://www.repoze.org/LICENSE.txt)',
    package_data = {
        'tapper': ['scaffolds/css/*', 'scaffolds/html/*', 'scaffolds/js/*']
    },
    packages=find_packages(),
    install_requires=install_requires,
    entry_points={
        'console_scripts':
            'tapper=tapper.scripts.tapper:main'
    })
