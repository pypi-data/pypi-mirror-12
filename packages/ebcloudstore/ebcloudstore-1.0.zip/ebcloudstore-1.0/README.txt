53iq 云存储python sdk
======================

用法
----

.. code-block:: python

    from ebcloudstore.client import EbStore
    myfile = open("/file/to/path/hello.jpg", "rb")
    store = EbStore("your token")
    r = store.upload(myfile, "hello.jpg", "image/jpeg")
    print(r)