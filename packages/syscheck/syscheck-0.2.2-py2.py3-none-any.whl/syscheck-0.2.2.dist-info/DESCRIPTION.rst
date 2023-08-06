syscheck
========

A simple status checking framework for monitoring the go/no go state
of arbitrary systems.

Simply create new "checkers" to query a system and return a boolean
value that indicates if the system is working correctly or if there is
an error.

A built-in web module is included for creating up-to-date status
boards viewable with a browser.

Requirements
------------

Mandatory dependencies are:

* Tornado_
* six_

To check a Redis database, tornadis_ is also required.

License
-------

syscheck is licensed under the BSD license. See the ``LICENSE`` file for
details.

.. _tornado: http://www.tornadoweb.org/en/stable/
.. _tornadis: https://github.com/thefab/tornadis
.. _six: http://pythonhosted.org/six/


