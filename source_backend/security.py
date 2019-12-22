from source_backend.model.UserModel import UserModel
from werkzeug.security import safe_str_cmp

def authenicate(email,pasword):
    user= UserModel.find_by_email(email)
    if user and safe_str_cmp(user.password,pasword):
        return user

def indentity(payload):
    user_id = payload['identity']
    return UserModel.find_by_id(user_id)
