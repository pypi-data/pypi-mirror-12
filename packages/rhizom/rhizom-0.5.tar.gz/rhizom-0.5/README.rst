Rhizom
======

Rhizom is a web application that can display efficiently a network of relationships.

It is based on `Flask`_, and the graph is displayed using `D3.js`_.

Authentication is handled by `Mozilla Persona`_.

- Download it from PyPI: https://pypi.python.org/pypi/rhizom
- Get the source and report bugs on GitLab: https://gitlab.com/abompard/rhizom

Rhizom is licensed under the `Affero GPL v3`_ or any later version.

.. _Flask: http://flask.pocoo.org/
.. _D3.js: http://d3js.org/
.. _`Mozilla Persona`: http://persona.org
.. _`Affero GPL v3`: http://www.gnu.org/licenses/agpl-3.0.html


Installation
------------

If you are unfamiliar with the way Flask applications are usually deployed,
check out `the official documentation`_ on Flask's website.

.. _`the official documentation`: http://flask.pocoo.org/docs/dev/deploying/

Rhizom provides some configuration examples to help you get started with common
deployment cases, check out the ``deploy`` subdirectory.


Quickstart
----------
This is how you can quickly check out Rhizom. Those steps are not fit for a
proper production deployment.

Install Rhizom's dependencies. Do do that you can either use your
distribution's package manager or create a Python VirtualEnv with the following
commands::

    $ virtualenv venv
    $ source ./venv/bin/activate
    $ pip install -r requirements.txt

Create a configuration file called ``config.py`` with the following content::

    import os
    basedir = os.path.abspath(os.path.dirname(__file__))
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'rhizom.db')
    BROWSERID_AUDIENCE = ["http://127.0.0.1:5000"]
    SECRET_KEY = 'JustHavingALook,ThankYou'
    ADMINS = ("your-email-address@your-domain.com")
    PROPAGATE_EXCEPTIONS = True

Now initialize the database with the follwing command::

    $ RHIZOM_SETTINGS=`pwd`/config.py python rhizom/scripts.py initdb

Finally, start Rhizom with the following command::

    $ RHIZOM_SETTINGS=`pwd`/config.py python rhizom/scripts.py runserver

The console should show you the URL to visit, usually `http://127.0.0.1:5000
<http://127.0.0.1:5000>`_. You can now login (using the Persona button) and
start creating graphs.

I hope you'll like it. Feedback is very welcome!


Contributing to the project
---------------------------

If you like Rhizom and want to help the project, you can do so in the following manner (in no particular order):

- installing and testing: see Quickstart above, report bugs on the Gitlab project page.
- fixing bugs and adding features: checkout the code and use merge requests.
- documentation: if things seem unclear or could be explained better, please do so.
- design: if you think the UI could be made more intuitive, I'm very open to suggestions.
- translations: Rhizom is currently translated into English, French, and Catalan. If you want to add a new translation or join a translation team, please contact us.
- spreading the word: if you like Rhizom, tell your friends! :-)
