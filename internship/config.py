import os


class Config(object):
    DEBUG = False
    # настройки бд
    MONGODB_DB = os.getenv('MONGODB_DB', 'internship')
    MONGODB_HOST = os.getenv('MONGODB_HOST', '127.0.0.1')
    MONGODB_PORT = os.getenv('MONGODB_PORT', '27017')


class DevConfig(Config):
    DEBUG = True


class ProdConfig(Config):
    DEBUG = False
