import json

import bcrypt,pickle
from flask import Flask, render_template, request, redirect
from flask_restful import Api
from flask_jwt import JWT
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from source_backend.model.UserModel import UserModel
from source_backend.security import authenicate, indentity
from source_backend.resource.user import UserRegister,UserLogin
from source_backend.resource.recipe import Recipe,RecipeList

from database_config import db

import uuid
from datetime import datetime


MASTERNAME = "ptsang"
PASSWORD = "695930599"
DATABASE_NAME = "postgres"
ENDPOINT = "homnayangidb.cemjothahgv9.ap-southeast-1.rds.amazonaws.com"
PORT = "5432"

SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://' + MASTERNAME + ':' \
                          + PASSWORD + '@' + ENDPOINT + ':' + PORT + '/'\
                            + DATABASE_NAME





import os
APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_PATH = os.path.join(APP_PATH, 'HomNayAnGi/source_frontend/templates/')
STATIC_DIR = os.path.join(APP_PATH, 'HomNayAnGi/source_frontend/static')

app = Flask(__name__,template_folder=TEMPLATE_PATH,static_folder=STATIC_DIR)
CORS(app)
app.secret_key = "Ма́ша и Медве́дь"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

api = Api(app)

jwt = JWT(app,authenicate,indentity)



#api.add_resource(Item,'/item/<string:name>')
#api.add_resource(ItemList,'/items')
api.add_resource(UserRegister,'/register')
api.add_resource(UserLogin,'/login')
api.add_resource(Recipe,'/addRecipe')
api.add_resource(RecipeList,'/listRecipe')
db.init_app(app)



if __name__== '__main__':
    app.run(host='0.0.0.0')
