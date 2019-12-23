import json

from flask import Flask, render_template, request, redirect
from flask_restful import Api
from flask_jwt import JWT
from flask_sqlalchemy import SQLAlchemy

from source_backend.model.UserModel import UserModel
from source_backend.security import authenicate, indentity
from source_backend.resource.user import UserRegister,UserLogin
from database_config import db

import uuid
from datetime import datetime


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



@app.route('/signin', methods=['GET', 'POST'])
def login():
    print(request.method)
    if request.method == 'POST':
        if request.form['signin']=='Đăng nhập':
            user = UserModel.login_by_email_password(request.form['your_name'], request.form['your_pass'])
            if user:
                print(user.jsonify())
                return redirect('/')
            else:
                return {'message': 'wrong username or password or invalid email'}
    return render_template('login.html')
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    print(request.method)
    if request.method == 'POST':
        if request.form['signup'] == 'Đăng ký':
            user = UserModel.find_by_email(request.form['email'])
            if user:
                return {'message': 'Email have already exist.'}
            else:
                print(request.form['name'])
                print(request.form['email'])
                print(request.form['pass'])
                print(request.form['agree-term'])
                print(request.form['re_pass'])
                if(request.form['name'] and request.form['email'] and request.form['pass'] and request.form['agree-term']=='on' and request.form['pass']==request.form['re_pass']):
                    user = UserModel(str(uuid.uuid1()), request.form['email'], request.form['pass'], 1,
                                     request.form['name'], 1, datetime.now(), "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg")
                    user.add_n_update()
                    return redirect('/signin')
                else:
                    return {'message':'missing something :)))))'}

    return render_template('signup.html')

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html')


#api.add_resource(Item,'/item/<string:name>')
#api.add_resource(ItemList,'/items')
api.add_resource(UserRegister,'/register')
api.add_resource(UserLogin,'/userlogin')
db.init_app(app)

if __name__== '__main__':
    app.run(port=6969,debug=True)