import config_reader as cr


class Config(object):
    CSRF_ENABLED = True
    SECRET_KEY = cr.get_server_secret_key()
    # настройки бд
    MONGODB_DB = cr.get_db_name()
    MONGODB_HOST = cr.get_db_host()
    MONGODB_PORT = cr.get_db_port()


class DevConfig(Config):
    DEBUG = True


class ProdConfig(Config):
    DEBUG = False
