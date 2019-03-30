import os
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager
from flask_oauthlib.client import OAuth


db = MongoEngine()
login_manager = LoginManager()
login_manager.session_protection = "strong"
oauth = OAuth()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevConfig')

    db.init_app(app)
    login_manager.init_app(app)
    oauth.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
