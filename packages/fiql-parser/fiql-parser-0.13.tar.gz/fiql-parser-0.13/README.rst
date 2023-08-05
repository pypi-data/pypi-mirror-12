FIQL Parser
===========

A Python parser for the Feed Item Query Language (FIQL).

Documentation
-------------

Complete documentation can be found at http://fiql-parser.readthedocs.org/

CHANGES
-------

**Version 0.13**

Release TBD

* Added Sphinx documentation.
* Split code into multiple files.
* Add exception classes to better distinguish between errors.

**Version 0.12**

Release on August 27th, 2015

* Added pylint to tox.
* Added Python3.4 support.

**Version 0.11**

Released on August 27th, 2015

* Update documentation to reflect new structure.
* BREAKS COMPATIBILITY WITH VERSIONS <= 0.10.

  * Adopt prefix format over inline for internal structure, ``to_python()``
    output, and fluent expression build method.

* Add missing ``py_modules`` required to actually end up with a working
  package.

**Version 0.10**

Released on December 18th, 2014

* Updated documentation for compatibility pypi and github.
* Fixed some stuff in setup.py pre upload to pypi.

**Version 0.9**

Released on December 3rd, 2014

* First public release.
