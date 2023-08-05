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
Custom exceptions module
"""
from __future__ import print_function
from __future__ import unicode_literals
from __future__ import division
from __future__ import absolute_import
from builtins import str
from future import standard_library
standard_library.install_aliases()

#----------------------------------------------------------------------
# Custom Exception Classes

class Error(Exception):
    """This is the base class of all other exception thrown by this
    ibmdbpy. It can be use to catch all exceptions with a single except
    statement.
    """
    def __init__(self, message):
        """This is the constructor which take one string argument."""
        self._message = message
    def __str__(self):
        """Converts the message to a string."""
        return('ibmdbpy::'+str(self.__class__.__name__)+': '+str(self._message))

class IdaDataBaseError(Error):
    """
    This exception is raised when an error occur while manipulating
    IdaDataBase interface
    """
    pass

class IdaDataFrameError(Error):
    """
    This exception is raised when an error occur while manipulating
    IdaDataFrame interface
    """
    pass

class PrimaryKeyError(Error):
    """
    This exception is raised when an error occur because of a missing or
    eroneous primary key column.
    """
    pass

class IdaKMeansError(Error):
    """
    This exception is raised when an error related to ibmdbpy KMeans
    clustering occur.
    """
    pass

class IdaAssociationRulesError(Error):
    """
    This exception is raised when an error related to ibmdbpy Association
    Rules occur.
    """
    pass

class IdaNaiveBayesError(Error):
    """
    This exception is raised when an error related to ibmdbpy Naive Bayes
  	occur.
    """
    pass