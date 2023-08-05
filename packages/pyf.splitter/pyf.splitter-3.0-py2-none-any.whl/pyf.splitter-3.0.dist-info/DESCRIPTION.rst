Introduction
============

pyf.splitter is a fully independent module that can be used with pyf or in
any other projet. It does not have dependencies on pyf.

Purpose
=======

The splitter purpose is simple and will stay so. It gives you an abstraction
above a data flow (or any python iterable) and gives the illusion of
manipulating in memory iterables when in fact everything is serialized on disk
to avoid memory consumption.

The second and last purpose is to split (hence the name) your data flow
according to some simple rules. Splitting is at the very least important
to be able to store huge data chunks on disk without hitting file systems
limitations (ever tried to store 600Gb files on a fat file system?)

It is important to note that we do not encapsulate (ie: hide) the bucket
files. The splitter gives you the bucket file names it produced, you then
use another function to read the files into another stream.


Running tests
=============

To run tests you need to install tox::

  pip install tox

and then just launch tox if you want the whole test suite, ie python2.7,
python3.4 and pep8.

If you want to only run only kind of test (ie: python2.7 only) you can specify
it like so::

  tox -e py27

all defined test envs are defined in the tox.ini file


