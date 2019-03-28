import os
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_oauthlib.client import OAuth
from flask_login import LoginManager


db = MongoEngine()
oauth = OAuth()
login_manager = LoginManager()
login_manager.session_protection = "strong"

stepic = None


def create_app():
    app = Flask(__name__)
    app.config.from_object(os.getenv('APP_SETTINGS', 'config'))

    db.init_app(app)
    oauth.init_app(app)
    login_manager.init_app(app)

    global stepic
    stepic = oauth.remote_app(
        'stepic',
        consumer_key = 'LydD4HY8OvupPTLgQaL85WGNKPQJSFpU2XvTCTUN',
        consumer_secret = 'ksFGbwDuCsqbs0z8HicNd1o3PK6HEI9VDWv6oQfkAA28VnRFGCv2fp6JR1mnE22u5wo3GMYRbCjzL3VsO23MwWyHBAzvT1CrO7ztUSOglZccSw0WU892ew5l48tDah67',
        request_token_params = {'scope': 'read write'},
        base_url = 'https://stepik.org/api/',
        request_token_url = None,
        access_token_method = 'POST',
        access_token_url = 'https://stepik.org/oauth2/token/',
        authorize_url = 'https://stepik.org/oauth2/authorize/',
    )

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
