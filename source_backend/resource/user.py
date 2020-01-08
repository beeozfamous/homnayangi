import uuid
from datetime import datetime

import bcrypt
from flask_restful import reqparse,Resource
from source_backend.model.UserModel import UserModel

import boto3 as boto3
import werkzeug


UPLOAD_FOLDER = "UserImage"
BUCKET = "hnag"


class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('email',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('password',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('role_id',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('fullname',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('gender_id',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('avatar_link',type=werkzeug.datastructures.FileStorage, location='files',help="This field cannot be blank")

    def post(self):
        data = UserRegister.parser.parse_args()

        f = data['avatar_link']
        imageID = str(uuid.uuid1())
        s3_client = boto3.client('s3')
        s3_client.put_object(Body=f,
                             Bucket=BUCKET,
                             Key=UPLOAD_FOLDER + '/' + imageID + '.jpg')

        if UserModel.find_by_email(str(data['email'])):
            return {'message': 'Email have already exist.',
                    'user': str(str(data['email']))}, 404
        user = UserModel(str(uuid.uuid1()),data['email'],(bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())).decode('utf-8'),int(data['role_id']),data['fullname'],bool(data['gender_id']),datetime.now(),'https://hnag.s3-ap-southeast-1.amazonaws.com/UserImage/'+imageID+'.jpg',True)
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



