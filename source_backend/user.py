import uuid
from datetime import datetime
from flask.views import MethodView
from flask_restful import  reqparse
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session,sessionmaker
import source_backend.create_table as database_connection

class User:
    def __init__(self,_id,_email,_password):
        self.id=_id
        self.email=_email
        self.password=_password
    @classmethod
    def find_by_email(cls,email):
        connection = database_connection.engine
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM users")

        query = "SELECT * FROM users WHERE email=?"
        result= cursor.execute(query,(email,))
        row=result.fetchone()
        if row:
            print(row[1])
            user = cls(row[0],row[1],row[2])
        else:
            user=None
        connection.close()
        return user

    @classmethod
    def find_by_id(cls, id):
        connection = database_connection.engine
        cursor = connection.cursor()
        query = "SELECT * FROM users WHERE userid=?"
        result = cursor.execute(query, (id,))
        row = result.fetchone()
        if row:
            user = cls(row[0],row[1],row[2])
        else:
            user = None
        connection.close()
        return user



class UserRegister(MethodView):

    parser = reqparse.RequestParser()
    parser.add_argument('email',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('password',type=str,required=True,help="This field cannot be blank")
    parser.add_argument('full_name',type=str,required=True,help="This field cannot be blank")
    def post(self):
        data = UserRegister.parser.parse_args()
        if User.find_by_email(str(data['email'])) is None:
            connection = database_connection.engine
            cursor = connection.cursor()
            query = "INSERT INTO users VALUES (?,?,?,?,?,?)"
            time = datetime.now().strftime("%B %d, %Y %I:%M%p")
            cursor.execute(query,(str(uuid.uuid1()),str(data['email']),str(data['password']),str(data['full_name']),str(time),str("no_link")))
            connection.commit()
            connection.close()
            return{'message':'Create user successfully.'},201
        else:
            return{'message':'Email have already exist.',
                   'user':str(User.find_by_email(str(data['email'])))},404
