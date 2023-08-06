SixIsles
========

PyMongo Based ActiveRecord Pattern O/R Mapper

--------------

Dependencies
------------

-  Python2.6 or Later
-  PyMongo >= 3.1.1

Installation
------------

.. code:: bash

    $ pip install SixIsles

Example
-------

Add Github Repository Documents

.. code:: python

    from sixIsles import Structure, Document, get_client
    from sixIsles.types import ObjectId, String

    class Repository(Document):
        struct = Structure(
            _id = ObjectId(),
            name = String(),
            author = String(),
            url = String()
        )

        class Meta:
            database = get_client("test_db_name", "localhost")

    document = Repository()
    document.name = "SixIsles"
    document.author = "teitei-tk"
    document.url = "https://github.com/teitei-tk/SixIsles"
    document.insert()

    or 

    document = Repository({
        "name": "SixIsles",
        "author": "teitei-tk",
        "url": "https://github.com/teitei-tk/SixIsles"
    })
    document.insert()

.. code:: bash

    $ mongo
    .....
    .....
    > use test_db_name
    switched to db test_db_name
    > show collections;
    repository
    system.indexes
    > db.repository.find()
    { "_id" : ObjectId("565895aacc7474890284fc8d"), "url" : "https://github.com/teitei-tk/SixIsles", "name" : "SixIsles", "author" : "teitei-tk" }
    >

TODO
----

-  [ ] Add TestCode
-  [ ] Update README
-  [ ] Register CI Tools

License
-------

-  MIT
