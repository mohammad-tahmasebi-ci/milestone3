import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
if os.path.exists("env.py"):
    import env 
    
app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

#if os.environ.get("DEVELOPMENT") == "True":
#    app.config["SQLALCHEMY_DATABASE_URI"] == os.environ.get("DB_URL")
#else:
#    uri = os.environ.get("DATABASE_URL")
#    if uri.startswith("postgres://"):
#        uri = uri.replace("postgres://", "postgresql://, 1")
#    app.config["SQLALCHEMY_DATABASE_URI"] = uri

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")

db = SQLAlchemy(app)

from appointments import routes
