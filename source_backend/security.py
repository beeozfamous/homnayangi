from source_backend.user import User

from werkzeug.security import safe_str_cmp

users=[
    (1,'ptsang','123456'),
(2,'bmnguyen','123456'),
(3,'hphat','123456'),
(4,'ntkien','123456'),
(5,'vdquan','123456')
]

def authenicate(email,pasword):
    user= User.find_by_email(email)
    if user and safe_str_cmp(user.password,pasword):
        return user

def indentity(payload):
    user_id = payload['identity']
    return User.find_by_id(user_id)
