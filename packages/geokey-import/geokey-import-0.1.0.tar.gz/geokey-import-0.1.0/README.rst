.. image:: https://img.shields.io/pypi/v/geokey-import.svg
    :alt: PyPI Package
    :target: https://pypi.python.org/pypi/geokey-import

.. image:: https://img.shields.io/travis/ExCiteS/geokey-import/master.svg
    :alt: Travis CI Build Status
    :target: https://travis-ci.org/ExCiteS/geokey-import

.. image:: https://img.shields.io/coveralls/ExCiteS/geokey-import/master.svg
    :alt: Coveralls Test Coverage
    :target: https://coveralls.io/r/ExCiteS/geokey-import

geokey-import
=============

Impot data to GeoKey from CSV formatted documents.

Install
-------

Install the extension from PyPI:

.. code-block:: console

    pip install geokey-import

Or from cloned repository:

.. code-block:: console

    cd geokey-import
    pip install -e .

Add the package to installed apps:

.. code-block:: console

    INSTALLED_APPS += (
        ...
        'geokey_import',
    )

Migrate the models into the database:

.. code-block:: console

    python manage.py migrate geokey_import

Copy static files:

.. code-block:: console

    python manage.py collectstatic

You're now ready to go!

Test
----

Run tests:

.. code-block:: console

    python manage.py test geokey_import

Check code coverage:

.. code-block:: console

    coverage run --source=geokey_import manage.py test geokey_import
    coverage report -m --omit=*/tests/*,*/migrations/*
