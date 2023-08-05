.. Ibmdbpy documentation master file, created by
   sphinx-quickstart on Tue Jul 14 13:18:19 2015.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to ibmdbpy's documentation!
***********************************

ibmdbpy
=======
Accelerating Python Analytics by In-Database Processing
-------------------------------------------------------

Ibmdbpy is an open-source project developed at IBM. Ibmdbpy provides a Python interface for data manipulation and in-database algorithms in IBM dashDB and IBM DB2. Ibmdbpy accelerates Python Analytics by seamlessly pushing operations written in Python into the underlying database for execution to benefit from in-database performance-enhancing features such as columnar store and parallel processing. 

IBM dashDB is a database management system available on IBM BlueMix, the cloud application development and analytics platform powered by IBM. Ibmdbpy can be used by Python developers with very little additional knowledge, since it copies the well-known interface of the Pandas library for data manipulation and the Scikit-learn library for the use of machine learning algorithms. 

Ibmdbpy is a cross-platform project compatible from Python 2.7 up to 3.4 and supports the connection to dashDB/DB2 instances via ODBC or JDBC.

The project is still at an early stage and a lot of features are still in development, but several experiments have already been conducted to show that ibmdbpy provides great runtime advantage for operations on middle to large amount of data, i.e. on tables that have 1 million rows or more. 

How does ibmdbpy works ?
------------------------

Ibmdbpy mainly translates Pandas-like syntax into SQL and send it to an ODBC/JDBC-connected database for execution, using a middleware API (pypyodbc/JayDeBeApi). Results are fetched and formatted in corresponding datastructure such as a Pandas.Dataframe or Pandas.Series.

We want to briefly illustrate how ibmdbpy works.

In a first step, we need to connect to a Database. We connect to a dashDB instance named ``DASHDB`` via ODBC, assuming that all connection parameters are correctty set in our ODBC settings. 

>>> from ibmdbpy import IdaDataBase, IdaDataFrame
>>> idadb = IdaDataBase('DASHDB')

Then we can open a table from the database. If you do not have any dataset yet, you can upload one using ``ibmdbpy.as_idadataframe``. Or use on a the sample dataset available. We pre-loaded our dashDB instance with the well-known ``IRIS`` dataset. Let's open it.  

>>> idadf = IdaDataFrame(idadb, 'IRIS')

Note that to open an IdaDataFrame object, we need to give our previously opened IdaDataBase object, because it holds the connection. 

Now let's compute the correlation matrix:

>>> idadf.corr()

In the background, ibmdbpy looks for numerical columns available in the dataset and build an SQL request that returns the correlation between each pair of columns. Here is the SQL request that was executed for this example::

   SELECT CORRELATION("sepal_length","sepal_width"), 
   CORRELATION("sepal_length","petal_length"), 
   CORRELATION("sepal_length","petal_width"), 
   CORRELATION("sepal_width","petal_length"), 
   CORRELATION("sepal_width","petal_width"), 
   CORRELATION("petal_length","petal_width") 
   FROM IRIS

The result fetched by ibmdbpy is then a tuple containing all values of the matrix, which is formatted back in a Pandas.DataFrame and final returned::

                 sepal_length  sepal_width  petal_length  petal_width
   sepal_length      1.000000    -0.117570      0.871754     0.817941
   sepal_width      -0.117570     1.000000     -0.428440    -0.366126
   petal_length      0.871754    -0.428440      1.000000     0.962865
   petal_width       0.817941    -0.366126      0.962865     1.000000

Et voilà !

Ibmdbpy can do much more than that. More information is available in this documentation for you to use. Enjoy!

Table of Content
================

.. highlight:: python

.. toctree::
   :maxdepth: 2

   install.rst
   start.rst
   base.rst
   frame.rst
   ml.rst
   utils.rst
   legal.rst

Project Roadmap
===============

* Full test coverage (A basic coverage is already provided)
* Add more functions and improve what already exists. 
* Add wrapper for several ML-Algorithms (Linear regression, Sequential patterns...) 
* Feature selection extension
* Add Spark as computational engine 

Contributors
============

The ibmdbpy project was initiated in April 2015, and developed by Edouard Fouché, at IBM Deutschland Reasearch & Development. 
More contributors may participate in the future. 

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`


