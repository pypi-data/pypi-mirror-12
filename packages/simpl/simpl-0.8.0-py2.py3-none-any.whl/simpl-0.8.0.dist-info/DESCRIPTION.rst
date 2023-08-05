simpl
=====

| |Build Status|  |Coverage Status|

Common Python libraries for:

-  `Configuration <#config>`__
-  `Logging <#logging>`__
-  `Secrets <#secrets>`__
-  `Python Utilites <#python>`__
-  `WSGI Middleware <#middleware>`__
-  `REST API Tooling <#rest>`__
-  `Date/Time (chronos) <#chronos>`__
-  `MongoDB Backend Wrapper <#mongo>`__

Config
------

| Supports argparse-like configuration options with support for the
  following
| configuration methods:

-  command-line arguments
-  environment variables
-  keychain (OSX) and keyring (Linux)
-  ini/config files

Logging (simpl.log)
-------------------

| Encapsulates logging boilerplate code to initialize logging using the
| `config <#config>`__ module.

Sensitive Value Helpers
-----------------------

Helpers for managing sensitive values.

Python Utilities
----------------

Code we wished was built in to python (or was simpler to use):

-  dictionary and list merging
-  dictionary get/set/in by path

WSGI middleware
---------------

Includes sample middleware for use with WSGI apps including bottle.

Middleware included:

-  CORS: handles CORS requests
-  Context: handles setting a threadlocal context and adds a transaction
   ID.
-  Errors: handles catching and formatting errors

REST API Tooling
----------------

Helper code for handling RESTful APIs using bottle.

Code included:

-  body: a decorator that parses a call body and passes it to a route as
   an argument. The decorator can apply a schema (any callable including
   a voluptuous.Schema), return a default, and enforce that a body is
   required.
-  paginated: a decorator that returns paginated data with correct
   limit/offset validation and HTTP responses.
-  process\_params: parses query parameters from bottle request

Date/Time Utilites
------------------

Provides functions that consistently format date/time and timestamp data
for use in APIs.

MongoDB Backend Wrapper
-----------------------

| Implements an opinionated wrapper for MongoDB databases and
  collections
| that works with the `rest <#rest>`__ module and supports query param
  filtering
| (including text search) and pagination of backend collections.

release
-------

|latest|

builds
------

+---------------------------------------------------------------+------------------+
| Branch                                                        | Status           |
+===============================================================+==================+
| `master <https://github.com/checkmate/simpl/tree/master>`__   | |Build Status|   |
+---------------------------------------------------------------+------------------+

.. |Build Status| image:: https://travis-ci.org/checkmate/simpl.svg?branch=master
   :target: https://travis-ci.org/checkmate/simpl
.. |Coverage Status| image:: https://coveralls.io/repos/checkmate/simpl/badge.svg?branch=master
   :target: https://coveralls.io/r/checkmate/simpl?branch=master
.. |latest| image:: https://img.shields.io/pypi/v/simpl.svg
   :target: https://pypi.python.org/pypi/simpl



