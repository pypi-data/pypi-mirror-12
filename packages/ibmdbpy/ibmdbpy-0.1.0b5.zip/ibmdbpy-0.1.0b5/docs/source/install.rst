Install
*******

Installing
----------

Ibmdbpy may be installed from ``pip``::

	> pip install ibmdbpy

Introduction
------------

To build the project from source::
  
 	> python setup.py install

To build the documentation::

	> cd docs
	> make html
	> make latex

To run the test::

	> py.test 

Per default, pytest assumes a database named "DASHDB" is reachable via ODBC connection and its credentials are stored in ODBC settings. This may be not the case for most users so several options are avaiable:

	* ``--dsn`` : Data Source Name
	* ``--uid``, ``--pwd`` : Database login and password
	* ``--jdbc`` : jdbc url string 
	* ``--table`` : Table to use to test (default: iris)

For testing, all tables from ibmdbpy.sampledata can be used : iris, swiss, titanic

More tables may be added in the future. 

Strict dependencies
-------------------

Ibmdbpy depends on several well-known python libraries such as Pandas and Numpy and a few pure-python libraries, which makes ibmdbpy easy to install

	* pandas
	* numpy
	* future
	* six
	* lazy
	* pypyodbc 

Optional dependencies
---------------------

Some optional libraries can be installed to benefit from extra features, such as:

	* jaydebeapi (Connection via JDBC)
	* pytest (for running tests)
	* sphinx (for building the documentation)
	* bokeh (visualization of benchmarks)

JayDeBeApi requires a C++ compiler, which may make it difficult to install for some users.  

Package structure
-----------------

.. code-block:: none

	ibmdbpy-master
	├── conftest.py
	├── LICENSE.txt
	├── MANIFEST.in
	├── README.rst
	├── setup.cfg
	├── setup.py
	├── docs
	│   ├── ...
	└── ibmdbpy
	    ├── __init__.py
	    ├── aggregation.py
	    ├── base.py
	    ├── exceptions.py
	    ├── filtering.py
	    ├── frame.py
	    ├── indexing.py
	    ├── internals.py
	    ├── series.py
	    ├── sql.py
	    ├── statistics.py
	    ├── internals.py
	    ├── utils.py
	    ├── benchmark
	    │   ├── __init__.py
	    │   ├── benchmark.py
	    ├── learn 
	    │   ├── __init__.py
	    │   ├── association_rules.py
	    │   ├── kmeans.py
	    │   ├── naive_bayes.py
	    ├── sampledata 
	    │   ├── ...
	    └── tests 
	        └── ...