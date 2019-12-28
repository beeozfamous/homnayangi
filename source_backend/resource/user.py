import uuid
from datetime import datetime

import bcrypt
from flask_restful import reqparse,Resource
from source_backend.model.UserModel import UserModel


class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('email',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('password',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('role_id',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('fullname',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('gender_id',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('avatar_link',type=str,required=True,help="This field cannot be blank")

    def post(self):
        data = UserRegister.parser.parse_args()
        if UserModel.find_by_email(str(data['email'])):
            return {'message': 'Email have already exist.',
                    'user': str(str(data['email']))}, 404
        user = UserModel(str(uuid.uuid1()),data['email'],(bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())).decode('utf-8'),int(data['role_id']),data['fullname'],bool(data['gender_id']),datetime.now(),data['avatar_link'],True)
        user.add_n_update()
        return{'message':'Create user successfully.'},201

class UserLogin(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, required=True, help="This field cannot be blank")
    parser.add_argument('password', type=str, required=True, help="This field cannot be blank")

    def post(self):
        data = UserLogin.parser.parse_args()
        user = UserModel.find_by_email(data['email'])
        if user.check_user_password(data['password']):
            return user.jsonify()
        else:
            return {'message':'wrong username or password or invalid email'}



