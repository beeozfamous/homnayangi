


class Development(object):
    """
    Development environment configuration
    """
    MASTERNAME = "ptsang"
    PASSWORD = "695930599"
    DATABASE_NAME = "postgres"
    ENDPOINT = "homnayanlondatabase.cemjothahgv9.ap-southeast-1.rds.amazonaws.com"
    PORT = "5432"
    PREFIX = "postgresql+psycopg2://'"

    DEBUG = True
    TESTING = False
    JWT_SECRET_KEY = "HomNayAnLon"
    SQLALCHEMY_DATABASE_URI = PREFIX \
                                        + MASTERNAME + ':' + PASSWORD \
                                        +'@' + ENDPOINT  +  ':' + PORT \
                                        + '/' + DATABASE_NAME

app_config = {
    'development': Development
}