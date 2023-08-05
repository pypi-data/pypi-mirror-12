Example Project ReadMe
======================


Running the example project
===========================
This document will guide you through the steps needed to run the example
Django project shipped with ``django-postgresql-manager``.

The example project has the following requirements:

- Django (``pip install Django``)
- Python bindings for SQLite 3 (``pip install pysqlite``)
- Python bindings for PostgreSQL (``pip install psycopg2``)

Once these are installed in your system, create the ``administrator`` role
in your PostgreSQL Cluster as described above::

    CREATE ROLE administrator WITH LOGIN CREATEDB CREATEROLE PASSWORD '1234';

Then load the example project's settings file in a text editor::

    vi settings.py

And make sure the ``postgresql_manager_conn`` database connection settings
are correct, otherwise the Django project won't be able to connect to the
PostgreSQL Cluster.

Next synchronize the Django project database (``test.db``)::

    python manage.py syncdb

Make sure you create a root account when prompted.

Finally run Django's internal web server::

    python manage.py runserver 127.0.0.1:8000

Use any web browser to connect to the admin interface::

    http://127.0.0.1:8000/admin/

Enjoy.


Setting up an example project
=============================

cd example

python /path/to/django-admin.py" startproject testproject

Eg:
python "C:\Program Files\Python27\Scripts\django-admin.py" startproject testproject

cd testproject/testproject


settings.py

# Add the path of postgresql_manager parent's dir
import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'src'))


    DATABASES = {
        ...
        # Database connection settings for postgresql_manager
        'postgresql_manager_conn': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'postgres',
            'USER': 'administrator',
            'PASSWORD': '1234',
            'HOST': 'localhost',
            'PORT': '5432',
            'OPTIONS': {
                'autocommit': True,
            },
        },
        ...
    }

    INSTALLED_APPS = (
        ...
        # PostgreSQL Manager
        'postgresql_manager',
        ...
    )


