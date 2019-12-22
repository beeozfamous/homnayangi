from flask import Flask
from flask_sqlalchemy import SQLAlchemy

MASTERNAME = "ptsang"
PASSWORD = "695930599"
DATABASE_NAME = "postgres"
ENDPOINT = "homnayanlondatabase.cemjothahgv9.ap-southeast-1.rds.amazonaws.com"
PORT ="5432"

SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://' + MASTERNAME + ':' \
                          + PASSWORD + '@' + ENDPOINT + ':' + PORT + '/'\
                            + DATABASE_NAME



app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db = SQLAlchemy()