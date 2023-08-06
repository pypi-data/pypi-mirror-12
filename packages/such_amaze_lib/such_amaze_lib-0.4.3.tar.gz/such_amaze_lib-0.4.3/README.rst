Such Amaze Library
==================

.. image:: http://cdn.meme.am/instances/62591861.jpg

Much Wow Functions
==================

``such_amaze_lib`` is a toolbox containing various useful functions and methods

How to install:
---------------

::

    pip install such_amaze_lib

Usage:
------

::

    >>> from such_amaze_lib import decorators
    >>> @decorators.wrapper_printer('NIK', 'POLISS')
    ... def villejuif():
    ...     print 'LA'
    ... 
    >>> print villejuif()
    NIK
    LA
    POLISS
    
Run pytest:
-----------

::

    cd such_amaze_lib
    py.test --doctest-mod -v .

Help:
-----
::

    >>> import such_amaze_lib
    >>> help(such_amaze_lib)

