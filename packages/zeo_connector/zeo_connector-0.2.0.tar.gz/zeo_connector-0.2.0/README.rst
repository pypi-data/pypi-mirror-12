Introduction
============

.. image:: https://badge.fury.io/py/zeo_connector.png
    :target: https://pypi.python.org/pypi/zeo_connector

.. image:: https://img.shields.io/pypi/dm/zeo_connector.svg
    :target: https://pypi.python.org/pypi/zeo_connector

.. image:: https://img.shields.io/pypi/l/zeo_connector.svg

.. image:: https://img.shields.io/github/issues/Bystroushaak/zeo_connector.svg
    :target: https://github.com/Bystroushaak/zeo_connector/issues

Wrappers, which make working with ZEO_ little bit nicer.

By default, you have to do a lot of stuff, like create connection to database, maintain it, synchronize it (or running asyncore loop), handle reconnects and so on. Classes defined in this project makes all this work for you at the background.

.. _ZEO: http://www.zodb.org/en/latest/documentation/guide/zeo.html

Documentation
-------------

This module defines three classes:

    - ZEOWrapperPrototype
    - ZEOConfWrapper
    - ZEOWrapper

ZEOWrapperPrototype
+++++++++++++++++++
``ZEOWrapperPrototype`` contains methods and shared attributes, which may be used by derived classes.

You can pretty much ignore this class, unless you want to make your own connector.

ZEOConfWrapper
++++++++++++++
``ZEOConfWrapper`` may be used to create connection to ZEO from `XML configuration file <https://pypi.python.org/pypi/ZEO/4.2.0b1#configuring-clients>`_.

Lets say you have file ``/tests/data/zeo_client.conf``:

.. code-block:: python

    <zeoclient>
      server localhost:60985
    </zeoclient>

You can now create the ``ZEOConfWrapper`` object:

.. code-block:: python

    from zeo_connector import ZEOConfWrapper

    db_obj = ZEOConfWrapper(
        conf_path="/tests/data/zeo_client.conf",
        project_key="Some project key",
    )

and save the data to the database:

.. code-block:: python

    import transaction

    with transaction.manager:
        db_obj["data"] = "some data"

String ``"some data"`` is now saved under ``db._connection.root()[project_key]["data"]`` path.

ZEOWrapper
++++++++++
``ZEOWrapper`` doesn't use XML configuration file, but direct server/port specification:

.. code-block:: python

    from zeo_connector import ZEOWrapper

    different_db_obj = ZEOWrapper(
        server="localhost",
        port=60985,
        project_key="Some project key",
    )

So you can retreive the data you stored into the database:

.. code-block:: python

    import transaction

    with transaction.manager:
        print different_db_obj["data"]

Running the ZEO server
----------------------
The examples expects, that the ZEO server is running. To run the ZEO, look at the help page of the ``runzeo`` script which is part of the ZEO bundle::

    Start the ZEO storage server.

    Usage: /usr/local/bin/runzeo [-C URL] [-a ADDRESS] [-f FILENAME] [-h]

    Options:
    -C/--configuration URL -- configuration file or URL
    -a/--address ADDRESS -- server address of the form PORT, HOST:PORT, or PATH
                            (a PATH must contain at least one "/")
    -f/--filename FILENAME -- filename for FileStorage
    -t/--timeout TIMEOUT -- transaction timeout in seconds (default no timeout)
    -h/--help -- print this usage message and exit
    -m/--monitor ADDRESS -- address of monitor server ([HOST:]PORT or PATH)
    --pid-file PATH -- relative path to output file containing this process's pid;
                       default $(INSTANCE_HOME)/var/ZEO.pid but only if envar
                       INSTANCE_HOME is defined

    Unless -C is specified, -a and -f are required.

Example of the server configuration file ``zeo_server.conf``::

    <zeo>
      address localhost:60985
    </zeo>

    <filestorage>
      path /whatever/storage.fs
    </filestorage>

    <eventlog>
      level INFO
      <logfile>
        path /whatever/zeo.log
        format %(asctime)s %(message)s
      </logfile>
    </eventlog>

You should change the ``path`` properties.

Command to run the ZEO with the server configuration file::

    runzeo -C zeo_server.conf
