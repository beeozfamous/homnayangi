from flask import Flask,render_template
from flask_restful import Api
from flask_jwt import JWT

from source_backend.security import authenicate, indentity
from source_backend.user import UserRegister
from source_backend.recipe import ItemList,Item
from config import app_config

import os
APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_PATH = os.path.join(APP_PATH, 'HomNayAnGi/source_frontend/templates/')
STATIC_DIR = os.path.join(APP_PATH, 'HomNayAnGi/source_frontend/static')

app = Flask(__name__,template_folder=TEMPLATE_PATH,static_folder=STATIC_DIR)
app.secret_key = "Ма́ша и Медве́дь"
api = Api(app)

jwt = JWT(app,authenicate,indentity)


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    return render_template('login.html', error=error)
@app.route('/', methods=['GET', 'POST'])
def home():
    error = None
    return render_template('home.html', error=error)


api.add_resource(Item,'/item/<string:name>')
api.add_resource(ItemList,'/items')
api.add_resource(UserRegister,'/register')

if __name__== '__main__':
    app.run(port=5000,debug=True)
