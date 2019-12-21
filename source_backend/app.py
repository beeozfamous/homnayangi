from flask import Flask,render_template
from flask_restful import Api
from flask_jwt import JWT

from security import authenicate, indentity
from user import UserRegister
from recipe import ItemList,Item

import os
APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_PATH = os.path.join(APP_PATH, './source_frontend/templates/')
STATIC_DIR = os.path.join(APP_PATH, './source_frontend/static')

app = Flask(__name__,template_folder=TEMPLATE_PATH,static_folder=STATIC_DIR)
app.secret_key = "Ма́ша и Медве́дь"
api = Api(app)

jwt = JWT(app,authenicate,indentity)


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    return render_template('login.html', error=error)
@app.route('/home', methods=['GET', 'POST'])
def home():
    error = None
    return render_template('home.html', error=error)

api.add_resource(Item,'/item/<string:name>')
api.add_resource(ItemList,'/items')
api.add_resource(UserRegister,'/register')

app.run(port=5000,debug=True)
    
