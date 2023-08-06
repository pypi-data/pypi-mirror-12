# -*- coding: utf-8 -*-
"""
Rhizom - Relationship grapher

Copyright (C) 2015  Aurelien Bompard <aurelien@bompard.org>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""

# pylint: disable-msg=wildcard-import,unused-argument

from __future__ import absolute_import, unicode_literals, print_function

import os
import jinja2

from flask import Flask, g, request
from flask_login import LoginManager, current_user
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)

app.config.from_object('rhizom.defaults')
if 'RHIZOM_SETTINGS' in os.environ:
    app.config.from_envvar('RHIZOM_SETTINGS')

# Multiple template folders
if app.config["TEMPLATE_DIRS"]:
    app.jinja_loader = jinja2.ChoiceLoader([
        jinja2.FileSystemLoader(app.config["TEMPLATE_DIRS"]),
        app.jinja_loader,
        ])


#
# i18n
#

from flask_babel import Babel, gettext
babel = Babel(app)

LANGUAGES = [(locale.language, locale.display_name.capitalize())
             for locale in babel.list_translations()]
LANGUAGES.insert(0, ("en", "English"))
LANGUAGES.sort(key=lambda lang: lang[0])

@babel.localeselector
def get_locale():
    if current_user.is_authenticated and current_user.locale:
        return current_user.locale
    return request.accept_languages.best_match([
        lang[0] for lang in LANGUAGES])


#
# Login
#

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "index"
login_manager.login_message = gettext("Please login to access this page.")
login_manager.login_message_category = "info"


from .models import User

@login_manager.user_loader
def load_user(userid):
    return User.query.get(userid)


#
# Database
#

@app.before_request
def before_request():
    from .database import get_session
    g.db = get_session(app.config["SQLALCHEMY_DATABASE_URI"])

@app.teardown_appcontext
def shutdown_session(exception=None):
    if hasattr(g, "db"):
        g.db.remove()

from sqlalchemy.engine import Engine
from sqlalchemy import event as sa_event
from sqlite3 import Connection as SQLite3Connection
@sa_event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, SQLite3Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

#
# CSRF protection
#
from flask_wtf.csrf import CsrfProtect
CsrfProtect(app)


# Views
from .views import *


if __name__ == '__main__':
    app.run()
