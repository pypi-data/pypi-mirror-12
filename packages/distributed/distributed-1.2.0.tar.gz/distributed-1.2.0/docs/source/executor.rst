Executor
========

The Executor is the primary entry point for users of ``distributed``.

After you :doc:`setup a cluster <setup>`, initialize an ``Executor`` by
pointing it to the Center node's address:

.. code-block:: python

   >>> from distributed import Executor
   >>> executor = Executor('127.0.0.1:8787')

Usage
-----

``submit``
~~~~~~~~~~

You can submit individual function calls with the ``executor.submit`` method

.. code-block:: python

   >>> def inc(x):
           return x + 1

   >>> x = executor.submit(inc, 10)
   >>> x
   <Future - key: inc-e4853cffcc2f51909cdb69d16dacd1a5>

The result is on one of the distributed workers.  We can continue using ``x``
in further calls to ``submit``:

.. code-block:: python

   >>> type(x)
   Future
   >>> y = executor.submit(inc, x)

Gather results
~~~~~~~~~~~~~~

We can collect results in a variety of ways.  First, we can use the
``.result()`` method on futures

.. code-block:: python

   >>> x.result()
   2

Second, we can use the gather method on the executor

.. code-block:: python

   >>> executor.gather([x, y])
   (2, 3)

Third, we can use the ``as_completed`` function to iterate over results as soon
as they become available.

.. code-block:: python

   >>> from distributed import as_completed
   >>> seq = as_completed([x, y])
   >>> next(seq).result()
   2
   >>> next(seq).result()
   3

But, as always, we want to minimize communicating results back to the local
process.  It's often best to leave data on the cluster and operate on it
remotely with functions like ``submit``, ``map``, and ``get``.

``map``
~~~~~~~

We can map a function over many inputs at once

.. code-block:: python

   >>> L = executor.map(inc, range(10))

The ``map`` method returns a list of futures.  This is a break with the
``concurrent.futures`` API, which returns the results directly.  We keep the
results as futures so that they can stay on the distributed cluster.

Additionally, we don't do any kind of batching so every function application
will be a new task which will have a couple milliseconds of overhead.  It is
unwise to use ``executor.map`` for small, fast functions where scheduling
overhead is likely to be more expensive than the cost of the function itself.
For example, our function ``inc`` is actually a *terrible* function to
parallelize in practice.


``get``
~~~~~~~

We can provide full complex dask graphs to the scheduler.

.. code-block:: python

   >>> dsk = {'x': 1, 'y': (inc, 'x')}
   >>> executor.get(dsk, 'y')
   2

This function pulls results back by default.  This is so that it can integrate
with existing dask code.

.. code-block:: python

   >>> import dask.array as da
   >>> x = da.random.random(1000000000, chunks=(1000000,))
   >>> x.sum().compute()  # use local threads
   499999359.23511785
   >>> x.sum().compute(get=executor.get)  # use distributed cluster
   499999359.23511785


Internals
---------

Data Locality
~~~~~~~~~~~~~

By default the executor does not bring results back to your local computer but
leaves them on the distributed network.  As a result, computations on returned
results like the following don't require any data transfer.

.. code-block:: python

   >>> y = executor.submit(inc, x)  # no data transfer required

Pure Functions by Default
~~~~~~~~~~~~~~~~~~~~~~~~~

By default we assume that all functions are pure.  If this is not the case you
should use the ``pure=False`` keyword argument.

The executor associates a key to all computations.  This key is accessible on
the Future object.

.. code-block:: python

   >>> from operator import add
   >>> x = executor.submit(add, 1, 2)
   >>> x.key
   'add-ebf39f96ad7174656f97097d658f3fa2'

This key should be the same accross all computations with the same inputs and
across all machines.  If you run the computation above you should get the exact
same key.

The scheduler avoids redundant computations.  If the result is already in
memory from a previous call then that old result will be used rather than
recreating it.

While convenient, this feature may be undesired for impure functions, like
``random``.  In these cases two calls to the same function with the same inputs
should produce different results.  We accomplish this with the ``pure=False``
keyword argument.

.. code-block:: python

   >>> import numpy as np
   >>> executor.submit(np.random.random, 1000, pure=False).key
   'random_sample-fc814a39-ee00-42f3-8b6f-cac65bcb5556'
   >>> executor.submit(np.random.random, 1000, pure=False).key
   'random_sample-a24e7220-a113-47f2-a030-72209439f093'


Garbage Collection
~~~~~~~~~~~~~~~~~~

Prolonged use of ``distributed`` may allocate a lot of remote data.  The
executor can clean up unused results by reference counting.

The executor reference counts ``Future`` objects.  When a particular key no
longer has any Future objects pointing to it it will be released from
distributed memory if no known computations still require it.

In this way garbage collection in the distributed memory space of your cluster
mirrors garbage collection within your local Python session.

Known futures and reference counts can be found in the following dictionaries

.. code-block:: python

   >>> executor.futures
   >>> executor.refcount

Also note that the scheduler cleans up intermediate results when provided full
dask graphs.  Also, you can always use the ``delete`` or ``clear`` functions in
``distributed.client`` to manage data manually.

Dask Graph
~~~~~~~~~~

The executor and scheduler maintains a dask graph of all known computations.
This graph is accessible via the ``.dask`` attribute.  At times it may be worth
visualizing this object.

.. code-block:: python

   >>> executor.dask

   >>> from dask.base import visualize
   >>> visualize(executor, filename='executor.pdf')

All functions like ``.submit``, ``.map``, and ``.get`` just add small subgraphs
to this graph.  Functions like ``.result``, ``as_completed``, or ``.gather``,
wait until their respective parts of the graph have completed.  All of
these actions are asynchronous to the actual execution of the graph, which is
managed in a background thread.

The dask graph is also used to recover results in case of failure.

Coroutines
~~~~~~~~~~

If you are operating in an asynchronous environment then all functions listed
here have asynchronous equivalents.  Currently these have the exact same name
but are prepended with an underscore (``_``) so, ``.result`` is synchronous
while ``._result`` is asynchronous.  If a function has no asynchronous
counterpart then that means it does not significantly block.  The ``.submit``
and ``.map`` functions are examples of this; they return immediately in either
case.
