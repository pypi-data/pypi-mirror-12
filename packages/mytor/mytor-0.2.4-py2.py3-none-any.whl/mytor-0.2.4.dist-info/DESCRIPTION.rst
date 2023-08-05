mytor
=====

.. image:: https://travis-ci.org/mosquito/mytor.svg
    :target: https://travis-ci.org/mosquito/mytor

Tornado asynchronous MySQL Driver

About
=====

mytor - presents a Tornado Future-based API and greenlet for
non-blocking access to MySQL.

Installation
============

::

    pip install TorMySQL

Examples
========

::

    from tornado.ioloop import IOLoop
    from tornado.get import coroutine
    import mytor

    pool = mytor.ConnectionPool(
        max_connections = 20, #max open connections
        idle_seconds = 7200, #conntion idle timeout time, 0 is not timeout
        host = "127.0.0.1",
        user = "root",
        passwd = "TEST",
        db = "test",
        charset = "utf8"
    )

    @coroutine
    def test():
        with (yield pool.Connection()) as conn:
            with conn.cursor() as cursor:
                yield cursor.execute("SELECT * FROM test")
                datas = cursor.fetchall()

        print datas

        yield pool.close()

    ioloop = IOLoop.instance()
    ioloop.run_sync(test)


