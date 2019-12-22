import json

from flask import Flask, render_template, request
from flask_restful import Api
from flask_jwt import JWT
from flask_sqlalchemy import SQLAlchemy

from source_backend.security import authenicate, indentity
from source_backend.resource.user import UserRegister,UserLogin
from database_config import db


MASTERNAME = "ptsang"
PASSWORD = "695930599"
DATABASE_NAME = "postgres"
ENDPOINT = "homnayanlondatabase.cemjothahgv9.ap-southeast-1.rds.amazonaws.com"
PORT ="5432"

SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://' + MASTERNAME + ':' \
                          + PASSWORD + '@' + ENDPOINT + ':' + PORT + '/'\
                            + DATABASE_NAME





import os
APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_PATH = os.path.join(APP_PATH, 'HomNayAnGi/source_frontend/templates/')
STATIC_DIR = os.path.join(APP_PATH, 'HomNayAnGi/source_frontend/static')

app = Flask(__name__,template_folder=TEMPLATE_PATH,static_folder=STATIC_DIR)
app.secret_key = "Ма́ша и Медве́дь"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

api = Api(app)

jwt = JWT(app,authenicate,indentity)

#-----------------------------------
#--------------TEST-ONLY------------
@app.route('/1', methods=['GET', 'POST'])
def testlayout1():
    error = None
    return render_template('home.html', error=error)
@app.route('/2', methods=['GET', 'POST'])
def testlayout2():
    error = None
    return render_template('layout.html', error=error)
@app.route('/3', methods=['GET', 'POST'])
def testlayout3():
    error = None
    return render_template('login.html', error=error)
@app.route('/4', methods=['GET', 'POST'])
def testlayout4():
    error = None
    return render_template('personalpage.html', error=error)
@app.route('/5', methods=['GET', 'POST'])
def testlayout5():
    error = None
    return render_template('signup.html', error=error)
@app.route('/6', methods=['GET', 'POST'])
def testlayout7():
    error = None
    return render_template('writerecipe.html', error=error)

#-----------------------------------


@app.route('/viewlogin', methods=['GET', 'POST'])
def viewlogin():
    error = None
    return render_template('login.html', error=error)



@app.route('/login', methods=['GET', 'POST'])
def login():

    _email = request.form['inputEmail']
    _password = request.form['inputPassword']

    if _email and _password:
        return json.dumps({'html': '<span>All fields good !!</span>'})
    else:
        return json.dumps({'html': '<span>Enter the required fields</span>'})

@app.route('/', methods=['GET', 'POST'])
def home():
    error = None
    return render_template('home.html', error=error)


#api.add_resource(Item,'/item/<string:name>')
#api.add_resource(ItemList,'/items')
api.add_resource(UserRegister,'/register')
api.add_resource(UserLogin,'/userlogin')
db.init_app(app)

if __name__== '__main__':
    app.run(port=5000,debug=True)