from flask import Blueprint

main = Blueprint('main', __name__)

from . import views, models, errors, stepik_auth