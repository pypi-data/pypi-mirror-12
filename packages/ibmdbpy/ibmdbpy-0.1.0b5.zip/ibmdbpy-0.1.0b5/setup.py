#!/usr/bin/env python
# -*- coding: utf-8 -*-
#-----------------------------------------------------------------------------
# Copyright (c) 2015, IBM Corp.
# All rights reserved.
#
# Distributed under the terms of the BSD Simplified License.
#
# The full license is in the LICENSE file, distributed with this software.
#-----------------------------------------------------------------------------

"""
setup.py
"""
# Always prefer setuptools over distutils
from setuptools import setup, find_packages
# To use a consistent encoding
from codecs import open
from os import path

#here = path.abspath(path.dirname(__file__))

# Get the long description from the relevant file
#with open(path.join(here, 'README.rst'), encoding='utf-8') as f:
#    longdesc = f.read()

with open('README.rst') as f:
    longdesc = f.read()

classifiers = [
	    # How mature is this project? Common values are
	    #   3 - Alpha
	    #   4 - Beta
	    #   5 - Production/Stable
	    'Development Status :: 4 - Beta',

	    # Indicate who your project is intended for
	    'Intended Audience :: Developers',
	    'Intended Audience :: Education',
	    'Intended Audience :: End Users/Desktop',
	    'Intended Audience :: Information Technology',
	    'Intended Audience :: Science/Research',
	    'Topic :: Software Development :: Build Tools',

	    # Pick your license as you wish (should match "license" above)
	    'License :: OSI Approved :: BSD License',

	    'Operating System :: MacOS :: MacOS X',
        'Operating System :: Microsoft :: Windows',
        'Operating System :: POSIX',

        'Natural Language :: English',

	    # Specify the Python versions you support here. In particular, ensure
	    # that you indicate whether you support Python 2, Python 3 or both.
	    'Programming Language :: Python :: 2.7',
	    'Programming Language :: Python :: 3',
	    'Programming Language :: Python :: 3.2',
	    'Programming Language :: Python :: 3.3',
	    'Programming Language :: Python :: 3.4',
	    'Programming Language :: Python :: Implementation :: CPython',

	    'Topic :: Database',
	    'Topic :: Scientific/Engineering',
	    'Topic :: Software Development'
	  ]

setup(name='ibmdbpy',
      version='0.1.0b5',
      install_requires=['pandas','numpy','future','six','pypyodbc','lazy'],
      # optional are jaydebeapi, pytest, sphinx, bokeh
      extras_require={
      	'jdbc':['jaydebeapi'],
      	'test':['pytest'],
      	'doc':['sphinx'],
      	'bench':['bokeh']
      },
      description='A Pandas-like SQL-wrapper for in-database analytics with IBM dashDB/DB2.',
      long_description=longdesc,
      url='https://github.com/ibmdbanalytics/ibmdbpy',
      author='IBM Corp.',
      author_email='fouche@de.ibm.com',
      license='BSD',
      classifiers=classifiers,
      keywords='data analytics database development IBM dashDB DB2 pandas scikitlearn scalability machine-learning knowledge discovery',
      packages=find_packages(exclude=['docs', 'tests*']),
      package_data={
      	'ibmdbpy.sampledata': ['*.txt']}
     )

