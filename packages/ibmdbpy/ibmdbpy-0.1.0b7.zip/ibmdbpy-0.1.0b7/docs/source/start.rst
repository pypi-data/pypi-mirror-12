.. highlight:: python

Quickstart
**********

Connect
=======

First of all, a connection to a remote dashDB/DB2 instance should be established.
IBM dashDB instances are available on Bluemix, the cloud development platform powered by IBM.::

	https://console.ng.bluemix.net/

You will need a Bluemix account. It is possible to get a 30-days trial account, if you don't have one and would like to try Bluemix. 

ODBC Connection
---------------

The default connection type for ibmdbpy is ODBC and is set as standard for Windows users. Downloading IBM drivers for DB2 and setting up for ODBC connection, including connection protocol, port, hostname, are mandatory before establishing the connection.

If credentials are stored in the ODBC windows connection settings, the connection can be done very easily by creating an IdaDataBase:

>>> from ibmdbpy.base import IdaDataBase
>>> idadb = IdaDataBase("DASHDB")

Otherwise, it is possible to connect by giving your credentials:

>>> idadb = IdaDataBase(dsn="DASHDB", uid="<UID>", pwd="<PWD>")

Using ODBC on other platforms than Windows may require additional configuration steps. 

JDBC Connection
---------------

The JDBC Connection is based on Java Virtual Machine, so it is basically available on every machine that can run Java. In ibmdbpy, users can choose to connect to a remote dashDB/DB2 instance using JDBC. To be able to connect using JDBC, users need to install the package ``JayDeBeApi``, set as optional dependency::

	pip install jaydebeapi

Additionnaly, you need install a version of the JRE (Java Runtime Environment) adapted to your platform.

For Linux users, JRE can be installed using the following command::

  sudo apt-get install default-jre

Aternatively, an installer can be dowloaded from Java website. 

The connection is done using the JDBC URL string. For a dashDB instance on Bluemix, the JDBC URL string can be found in the section 'Connect > Connection Information'

>>> jdbc = 'jdbc:db2://<HOST>:<PORT>/<DBNAME>:user=<UID>;password=<PWD>'
>>> IdaDataBase(jdbc)
<ibmdbpy.base.IdaDataBase at 0x9bec860>

Or, alternatively

>>> jdbc = 'jdbc:db2://<HOST>:<PORT>/<DBNAME>'
>>> IdaDataBase(dsn=jdbc, uid="<UID>", pwd="<PWD>")
<ibmdbpy.base.IdaDataBase at 0x9bec860>

A C++ compiler may be necessary to install the JayDeBeApi package. Its installation may be not trivial, especially for windows users, this is why it is not declared as a strict requirement. Also, it has been showed that JDBC connection is generally slower than ODBC. So we recommend users to connect with ODBC. 

Autocommit
----------
Per default the connection is opened in autocommit mode, which means all operations are committed automatically.
This behavior can be changed by setting the option ``autocommit`` to ``False`` or by using the ``set_autocommit`` function.

>>> idadb = IdaDataBase("DASHDB", autocommit=False)

Alternatively

>>> from ibmdbpy.utils import set_autocommit
>>> set_autocommit(False)

Verbosity
---------
The verbose mode prints automatically all SQL-communication between ibmdbpy and dashDB, this can be very usefull for debugging or understanding how ibmdbpy works. This is per default activated, but can be turned down by setting the option ``verbose`` to ``False`` or using the ``set_verbose`` function.

>>> idadb = IdaDataBase("DASHDB", verbose=False)

Alternatively 

>>> from ibmdbpy.utils import set_verbose
>>> set_verbose(False)

Conventions
-----------

Users need to create an IdaDataBase instance before creating some IdaDataFrame for table manipulation. By convention, one should use only a single instance of IdaDataBase per database but may use several instances of IdaDataFrame objects per table and connection.

The philosophy behind the dispatching of features between IdaDataBase and IdaDataFrame is that most methods of IdaDataBase are destructive for the integrity of tables and of the database, while it is possible to manipulate IdaDataFrame without making any actual changes in the physical data of the database. 

Close the connection
--------------------

To ensure expected behaviors, IdaDataBase instances need to be closed. Closing the IdaDataBase is equivalent to closing the connection: once the connection is closed, it is not possible to use the IdaDataBase instance and any IdaDataFrame instances that were opened on this connection anymore.

>>> idadb.close()
'A SQL-Handle for database DASHDB was closed'

If the autocommit mode is activated, then all changes in the IdaDataFrame and others will be commited, otherwise they will be discarded (rollback).

Note: It is possible to reopen the connection of IdaDataBase using the function ``IdaDataBase.reconnect()`` this can be usefull for example in case of a timeout or sloppy connection.

>>> idadb.reconnect()
'The connection was successfully restored'

Manipulate database objects
===========================

Open an IdaDataFrame
--------------------

Using our previously opened IdaDatabase instance named 'idadb', we can open one or several IdaDataFrame objects. They behave like pointers to a remote tables.

Let us open the iris dataset, assuming it is stored in the database under the name 'IRIS'

>>> idadf = IdaDataFrame(idadb, 'IRIS')

Explore data
------------

You can explore the data very easily in the IdaDataFrame by using builtin functions

Get the first n records of your dataset using ``IdaDataFrame.head`` (default 5)

>>> idadf.head()
   sepal_length  sepal_width  petal_length  petal_width species
0           5.1          3.5           1.4          0.2  setosa
1           4.9          3.0           1.4          0.2  setosa
2           4.7          3.2           1.3          0.2  setosa
3           4.6          3.1           1.5          0.2  setosa
4           5.0          3.6           1.4          0.2  setosa

Get the last n records of your dataset using ``IdaDataFrame.tail`` (default 5)

>>> idadf.tail()
     sepal_length  sepal_width  petal_length  petal_width    species
145           6.7          3.0           5.2          2.3  virginica
146           6.3          2.5           5.0          1.9  virginica
147           6.5          3.0           5.2          2.0  virginica
148           6.2          3.4           5.4          2.3  virginica
149           5.9          3.0           5.1          1.8  virginica

Note: Since dashDB operates on a distributed system, the order of rows using ``IdaDataFrame.head`` and ``IdaDataFrame.tail`` is not guaranteed provided that the table is not sorted (using an 'ORDER BY' clause) or that no column was declared as index for the IdaDataFrame (parameter/attribute ``indexer``).

IdaDataFrame also implements most of the attributes that are available in Pandas DataFrame.

>>> idadf.shape
(150,5)

>>> idadf.columns
Index(['sepal_length', 'sepal_width', 'petal_length', 'petal_width',
       'species'],
      dtype='object')

>>> idadf.dtype
             TYPENAME
sepal_length   DOUBLE
sepal_width    DOUBLE
petal_length   DOUBLE
petal_width    DOUBLE
species       VARCHAR


Simple statistics
-----------------

Several standard statistics functions from the Pandas interface are also available for IdaDataFrame. For example, let's calculate the covariance matrix for the iris dataset

>>> idadf.cov()
              sepal_length  sepal_width  petal_length  petal_width
sepal_length      0.685694    -0.042434      1.274315     0.516271
sepal_width      -0.042434     0.189979     -0.329656    -0.121639
petal_length      1.274315    -0.329656      3.116278     1.295609
petal_width       0.516271    -0.121639      1.295609     0.581006

For more information and examples methods supported by IdaDataFrame objects, please check the IdaDataFrame class documentation. 

Selection
---------

It is possible to subset the rows of an IdaDataFrame by accessing the IdaDataFrame with a slice object or by using the ``IdaDataFrame.loc`` attribute, which contains an ``ibmdbpy.Loc`` object. However, the accuracy of a row selection is not guaranteed if the current IdaDataFrame is not sorted or does not contains an indexer. This is due to the fact that dashDB stores the data across several nodes if available. Moreover, since dashDB is a column oriented database, row numbers are undefined. 

>>> idadf_new = idadf[0:9] # Select the first 10 rows

Alternatively,

>>> idadf_new = idadf.loc[0:9]

Which is equivalent to selecting the 10 first IDs in a list: 

>>> idadf_new = idadf.loc[[0,1,2,3,4,5,6,7,8,9]]

This makes of course only sense if an ID column is provided, otherwise the selection is non deterministic. A warning is showed to users in that case. 

Projection
----------

* It is possible to select a subset of columns in an IdaDataFrame. 

>>> idadf_new = idadf[['sepal_length', 'sepal_width']]

As in Pandas interface, this operation creates a new IdaDataFrame instance, similar to the current one, which contains only the selected column(s). This is done so to allow users to further manipulate the original IdaDataFrame and the new one independently.

>>> idadf_new.head()
   sepal_length  sepal_width 
0           5.1          3.5 
1           4.9          3.0 
2           4.7          3.2 
3           4.6          3.1 
4           5.0          3.6 

Note that ``idadf['sepal_length']`` is not equivalent to ``idadf[['sepa_length']]``. The first one returns an IdaSeries object that behaves like a Pandas.Series object, the second an IdaDataFrame which contains only one column. For example :

>>> idadf_new = idadf[['sepal_length']]
>>> idadf_new.head()
   sepal_length 
0           5.1  
1           4.9  
2           4.7  
3           4.6 
4           5.0  

>>> idaseries = idadf['sepal_length']
>>> idaseries.head()
0    5.1
1    4.9
2    4.7
3    4.6
4    5.0
Name: sepal_length, dtype: float64

* Selection and projection can be done simultaneously by using the ``IdaDataFrame.loc`` attribute.

This selects all even rows in the column ``sepal_length``:

>>> idadf_new = idadf.loc[::2,'sepal_length']

Given that an ID column is provided to the dataset and declared as indexer, the selection operates on its ID column. In that case, a column "ID" has been previously added to the dataset, which provides a unique integer to identify for the rows.

>>> idadf = IdaDataFrame(idadb, "IRIS", indexer = "ID")
>>> idadf_new = idadf.loc[::2,['ID', 'sepal_length']]
>>> idadf_new.head(10)
   ID  sepal_length
0   0           5.1
1   2           5.1
2   4           4.6
3   6           5.2
4   8           5.2
5  10           5.5
6  12           5.0
7  14           5.0
8  16           6.5
9  18           6.0

Sorting
-------

Sorting is also possible using the function ``IdaDataFrame.sort``, which implements similar arguments as ``Pandas.DataFrame.sort``. It is possible to sort by ascending or descending order, along both axis.

* Sort by rows over one column

>>> idadf_new = idadf.sort("sepal_length")
>>> idadf_new.head()
    ID  sepal_length  sepal_width  petal_length  petal_width species
0  120           4.3          3.0           1.1          0.1  setosa
1  124           4.4          3.0           1.3          0.2  setosa
2   44           4.4          2.9           1.4          0.2  setosa
3   52           4.4          3.2           1.3          0.2  setosa
4   78           4.5          2.3           1.3          0.3  setosa

* Sort by rows over several columns 

>>> idadf_new = idadf.sort(["sepal_length","sepal_width"])
>>> idadf_new.head()
    ID  sepal_length  sepal_width  petal_length  petal_width species
0  120           4.3          3.0           1.1          0.1  setosa
1   44           4.4          2.9           1.4          0.2  setosa
2  124           4.4          3.0           1.3          0.2  setosa
3   52           4.4          3.2           1.3          0.2  setosa
4   78           4.5          2.3           1.3          0.3  setosa

* Sort by rows over several columns in descending order

>>> idadf_new = idadf.sort("sepal_length", ascending=False)
>>> idadf_new.head()
    ID  sepal_length  sepal_width  petal_length  petal_width    species
0  144           7.9          3.8           6.4          2.0  virginica
1  105           7.7          3.8           6.7          2.2  virginica
2  106           7.7          2.6           6.9          2.3  virginica
3   37           7.7          2.8           6.7          2.0  virginica
4  111           7.7          3.0           6.1          2.3  virginica

* Sort by rows over several columns in descending order, inplace

>>> idadf.sort("sepal_length", ascending=False, inplace=True)
>>> idadf.head()
    ID  sepal_length  sepal_width  petal_length  petal_width    species
0  144           7.9          3.8           6.4          2.0  virginica
1  105           7.7          3.8           6.7          2.2  virginica
2  106           7.7          2.6           6.9          2.3  virginica
3   37           7.7          2.8           6.7          2.0  virginica
4  111           7.7          3.0           6.1          2.3  virginica

* Sort by columns

>>> idadf = IdaDataFrame(idadb, "IRIS", indexer="ID")
>>> idadf.sort(axis = 1, inplace=True)
>>> idadf.head()
   ID  petal_length  petal_width  sepal_length  sepal_width species
0   0           1.4          0.2           5.1          3.5  setosa
1   1           1.5          0.2           5.0          3.4  setosa
2   2           1.4          0.3           5.1          3.5  setosa
3   3           1.5          0.4           5.1          3.7  setosa
4   4           1.0          0.2           4.6          3.6  setosa

Filtering
---------

It is possible to subset the dataset depending on one or several criterions, which can be combined.
Filters are based on string or integer values in columns. 

All supported comparison operators are <, <=, ==, !=, >=, >

* Select all rows for which 'sepal_length' value is smaller than 5 

>>> idadf.shape
(150,5)

>>> idadf_new = idadf[idadf['sepal_length'] < 5]
>>> idadf_new.head()
    ID  sepal_length  sepal_width  petal_length  petal_width species
0   46           4.8          3.4           1.6          0.2  setosa
1  119           4.8          3.0           1.4          0.1  setosa
2  118           4.9          3.1           1.5          0.1  setosa
3   66           4.7          3.2           1.3          0.2  setosa
4   49           4.8          3.4           1.9          0.2  setosa

>>> idadf_new.shape 
(22, 5) # Here we can see that only 22 records meet the criterion

* Select all samples belonging to the 'versicolor' species

>>> idadf_new = idadf[idadf['species'] == 'versicolor']
   ID  sepal_length  sepal_width  petal_length  petal_width     species
0  89           6.7          3.0           5.0          1.7  versicolor
1  56           5.8          2.7           4.1          1.0  versicolor
2  32           5.7          2.8           4.1          1.3  versicolor
3  92           6.0          3.4           4.5          1.6  versicolor
4  99           5.1          2.5           3.0          1.1  versicolor

Filtering criterions can also be combined. All supported boolean symbols are &, \|, ^

* Select all samples belonging to the 'versicolor' species with 'sepal_length' smaller than 5

>>> criterion = (idadf['species'] == 'versicolor')&(idadf['sepal_length'] < 5)
>>> idadf_new = idadf[criterion ]
>>> idadf_new.head()
    ID  sepal_length  sepal_width  petal_length  petal_width     species
0  128           4.9          2.4           3.3            1  versicolor

Conclusion: there is only one sample for which both conditions are true 

Feature Engineering
-------------------

New columns in an IdaDataFrame can be defined based on the aggregation of existing columns and numbers. The following operations are defined : +, -, \*, /, //, %, \*\*. This happens in a non-destructive way, i.e. the original data in the database remains unchanged. A view on the top of the table is created in which user aggregations are defined. For examples:

* Add a new columns based on aggregation of existing columns. 

>>> idadf['new'] = idadf['sepal_length'] * idadf['sepal_width']
>>> idadf.head()
   ID  sepal_length  sepal_width  petal_length  petal_width species    new
0   0           5.1          3.5           1.4          0.2  setosa  17.85
1   1           5.0          3.4           1.5          0.2  setosa  17.00
2   2           5.1          3.5           1.4          0.3  setosa  17.85
3   3           5.1          3.7           1.5          0.4  setosa  18.87
4   4           4.6          3.6           1.0          0.2  setosa  16.56

* Here a few more examples

>>> idadf['new'] = 2 ** idadf['petal_length']
>>> idadf.head()
   ID  sepal_length  sepal_width  petal_length  petal_width species       new
0   0           5.1          3.5           1.4          0.2  setosa  2.639016
1   1           5.0          3.4           1.5          0.2  setosa  2.828427
2   2           5.1          3.5           1.4          0.3  setosa  2.639016
3   3           5.1          3.7           1.5          0.4  setosa  2.828427
4   4           4.6          3.6           1.0          0.2  setosa  2.000000 

>>> idadf['new'] = idadf['new'] - idadf['new'].mean()
>>> idadf.head()
   sepal_length  sepal_width  petal_length  petal_width     species        new
0           4.4          2.9           1.4          0.2      setosa -21.867544
1           5.6          2.9           3.6          1.3  versicolor -12.380828
2           5.4          3.9           1.3          0.4      setosa -22.044271
3           5.0          3.4           1.5          0.2      setosa -21.678133
4           5.8          2.6           4.0          1.2  versicolor  -8.506560  

* It is possible to delete columns

>>> del idadf['new']
>>> del idadf['species']

* It is also possible to modify existing columns.

>>> idadf['sepal_length'] = idadf['sepal_length'] / 2 
   ID  sepal_length  sepal_width  petal_length  petal_width
0   0          2.55          3.5           1.4          0.2
1   1          2.50          3.4           1.5          0.2
2   2          2.55          3.5           1.4          0.3
3   3          2.55          3.7           1.5          0.4
4   4          2.30          3.6           1.0          0.2

* Or to modify several or all columns at the same time.

>>> newidaf = idadf[['sepal_length', 'sepal_width']] + 2
>>> idadf[['sepal_length', 'sepal_width']] = newidadf
>>> idadf.head()
   ID  sepal_length  sepal_width  petal_length  petal_width
0   0          4.55          5.5           1.4          0.2
1   1          4.50          5.4           1.5          0.2
2   2          4.55          5.5           1.4          0.3
3   3          4.55          5.7           1.5          0.4
4   4          4.30          5.6           1.0          0.2

>>> idadf = idadf + idadf['sepal_length'].var() 
>>> idadf.head() # Possible because all columns are numeric
         ID  sepal_length  sepal_width  petal_length  petal_width
0  0.171423      4.721423     5.671423      1.571423     0.371423
1  1.171423      4.671423     5.571423      1.671423     0.371423
2  2.171423      4.721423     5.671423      1.571423     0.471423
3  3.171423      4.721423     5.871423      1.671423     0.571423
4  4.171423      4.471423     5.771423      1.171423     0.371423

Those examples show what it is possible to do with IdaDataFrame/IdaSeries instances. However, chaining operations like this may slow down generally the processing of the IdaDataFrame, because the values of the new columns are calculated “on the fly” and are not physically available in the database.

It is advised to use the function ``IdaDataFrame.save_as``, after aggregating several times columns of the IdaDataFrame so to rely on physical data instead of virtual. Plus, by using the ``IdaDataFrame.save_as`` function, all modifications will be permanently backed up in the database. Otherwise, all changes are lost when the connection terminates.

One limit to feature engineering in ibmdbpy is that it is not possible to directly use columns from other tables to perform aggregation. This would require to perform a join operation. Some work has to be done in this direction later.

Machine Learning
----------------

Ibmdbpy provides a wrapper for several machine learning algorithms that are developed for in-database use. Those algorithms are implemented in PL/SQL and C++. Currently, the wrappers for the following algorithms were developed: Kmeans, Association Rules, Naive Bayes. Their interface is copied from Scikit-learn.

Here is a example with Kmeans:

>>> idadf = IdaDataBase(idadb, 'IRIS', indexer="ID")
# In-DataBase Kmeans needs an indexer to identify each row 

>>> from ibmdbpy.learn import KMeans
>>> kmeans = KMeans(3) # configure clustering with 3 cluters

>>> kmeans.fit(idadf)
>>> kmeans.predict(idadf)

>>> kmeans.describe()
KMeans clustering with 3 clusters of sizes 49, 50, 51
Cluster means: 
   CLUSTERID  sepal_length  sepal_width  petal_length  petal_width     species
0          1      5.879592     2.753061      4.236735     1.322449  versicolor
1          2      6.629412     2.986275      5.549020     2.015686   virginica
2          3      5.006000     3.428000      1.462000     0.246000      setosa
Within cluster sum of squares by cluster:
[ 30.22072306  15.151       42.54618313]

>>> kmeans.inertia_
87.917906189953897

>>> kmeans.labels_.sort("ID").head()
   ID  CLUSTER_ID  DISTANCE
0   0           3  0.141351
1   1           3  0.066182
2   2           3  0.144153
3   3           3  0.328603
4   4           3  0.640297

To know how to use other machine learning algorithms, please refer to the detailled documentation. 

Benchmarking
------------

A performance testing framework is available for ibmdbpy, which tests the execution time of the same line of code simultaneously for the in-database and in-memory version on a same growing dataset. This framework is usefull especially for profiling purpose and showing the advange of ibmdbpy over traditional in-memory implementation. 

Here is how to use it and an example of result it can produce:

>>> from ibmdbpy.benchmark import Benchmark
>>> benchmark = Benchmark(idadf, "Covariance matrix", "cov()")

>>> benchmark.run()
*** Initializing benchmark to 1K, with command cov() ***
Uploading 1000 rows (maxnrow was set to 1333)
*** Benchmarking with 1000 rows ***
Length of DataFrame : 1000              Length of IdaDataFrame : 1000
Runtime in-Memory : 0.0012              Runtime in-Database : 0.165
*** Incrementing for next round ***
Uploading 1000 rows (maxnrow was set to 1333)
*** Benchmarking with 2000 rows ***
Length of DataFrame : 2000              Length of IdaDataFrame : 2000
Runtime in-Memory : 0.001               Runtime in-Database : 0.1287
*** Incrementing for next round ***
DataFrame will be splitted into 2 chunks. (1333 rows per chunk)
Uploaded: 2/2... [DONE]
*** Benchmarking with 4000 rows ***
Length of DataFrame : 4000              Length of IdaDataFrame : 4000
Runtime in-Memory : 0.0012              Runtime in-Database : 0.1252
*** Incrementing for next round ***
DataFrame will be splitted into 4 chunks. (1333 rows per chunk)
Uploaded: 4/4... [DONE]
*** Benchmarking with 8000 rows ***
Length of DataFrame : 8000              Length of IdaDataFrame : 8000
Runtime in-Memory : 0.0012              Runtime in-Database : 0.1574
*** Incrementing for next round ***
DataFrame will be splitted into 7 chunks. (1333 rows per chunk)
Uploaded: 7/7... [DONE]
...

If the benchmark get interrupted for some reason (connection lost, out of memory), it is possible to resume it anytime by using the ``Benchmark.resume()`` method. In the case where the connection was lost, reconnecting the IdaDataBase before may also be needed (``IdaDataBase.reconnect()``). 

>>> benchmark.resume()
...

When the benchmark terminates, or run long enough and stop (Either because of some error or a use KeyBoard Interrupt), it is possible to plot the result using the ``Benchmark.visualize()`` method. Bokeh interactive plot are stored in the project repository. 

>>> benchmark.visualize()
...

Note that the result of benchmarks depends highly on how many core and RAM are available in the dashDB/DB2 instance. 

Database administration
=======================

Upload a DataFrame
------------------

It is possible to upload a local Pandas DataFrame to a dashDB instance. A few dataset are also included in ibmdbpy. For example, to upload the dataset iris, do

>>> from ibmdbpy.sampledata.iris import iris
>>> idadb = IdaDataBase('DASHDB')
>>> idadb.as_idadataframe(iris, 'IRIS')
<ibmdbpy.frame.IdaDataFrame at 0x9ee2d30>

The column datatypes of the Pandas DataFrame are detected and then mapped to database types such as ``DOUBLE`` and ``VARCHAR``. The mapping is for now quite basic, but handle most use cases. More work has to be done to improve storage space and include special datatypes such as datetimes and timestamp. Currently supported are all string and numeric types as well as boolean. 

If a table or a view 'IRIS' already exists, it will throw an error. By using the option ``clear_existing`` the table will be dropped before uploading if it already exists.

>>> idadb.as_idadataframe(iris, 'IRIS', clear_existing=True)
<ibmdbpy.frame.IdaDataFrame at 0x9ee2d30>

Note that the function returns an IdaDataFrame object pointing to the newly uploaded dataset, so that we can directly start playing with it.

Ibmdbpy uses a sophisticated chunking mechanism to improve the performance of this operation. The speed however may depend on the network connection. It is possible to upload several million rows DataFrames in a reasonnable time using this function. 

Download a Dataset
------------------

It is also possible to download a dataset from a dashDB instance. 

>>> idadf = IdaDataFrame(idadb, 'IRIS')
>>> iris = idadf.as_dataframe()


Database types are mapped to Pandas datatypes such as object for strings and float for numeric values. However, if the dataset is too big, this may take a long time. If the connection is lost, it fails and throw an error. 

Explore the Database
--------------------

To get an list of existing tables in the database, use the ``IdaDataBase.show_tables()`` function

>>> idadb = IdaDataBase('DASHDB')
>>> idadb.show_tables()
     TABSCHEMA           TABNAME       OWNER TYPE
0    DASHXXXXXX            SWISS  DASHXXXXXX    T
1    DASHXXXXXX             IRIS  DASHXXXXXX    T
2    DASHXXXXXX     VIEW_TITANIC  DASHXXXXXX    V

Several other Database administration features are available, for more information check the IdaDataBase object documentation. 