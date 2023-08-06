Process-shared Reader-Writer locks for Python
=============================================

.. image:: https://travis-ci.org/trovao/prwlock.svg
    :target: https://travis-ci.org/trovao/prwlock

.. image:: https://coveralls.io/repos/trovao/prwlock/badge.svg?branch=master&service=github
    :target: https://coveralls.io/github/trovao/prwlock?branch=master

A `reader-writer lock <https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock>`_ for
Python that can (*must*, actually) be used for locking across multiple Python processes.

The rationale and initial implementation of the project can be found in the
`accompanying blog post <https://renatocunha.com/blog/2015/11/ctypes-mmap-rwlock/>`_.

Usage
-----

There is no need for initialization. Therefore, a code block such as the one below is
enough to get an RWLock instance.

.. code-block:: python

    from prwlock.prwlock import RWLock

    rwlock = RWLock()

The RWLock itself is pickleable and, therefore, can be passed around to child processes,
such as in the code block below.

.. code-block:: python

    from __future__ import print_function

    import os
    import time

    from multiprocessing import Pool
    from prwlock.prwlock import RWLock
    def f(rwlock):
        for i in range(2):
            print(os.getpid(), 'Acquiring read lock')
            rwlock.acquire_read()
            print(os.getpid(), 'Sleeping for a while')
            time.sleep(1)
            print(os.getpid(), 'Releasing lock')
            rwlock.release()
            time.sleep(.1)

    r = RWLock()
    children = 20
    pool = Pool(processes=children)
    for child in range(children):
        pool.apply_async(f, [r])


