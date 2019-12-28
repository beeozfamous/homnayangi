import bcrypt

from database_config import db
import bcrypt


class UserModel(db.Model):
    __tablename__ = 'users'

    userid = db.Column(db.VARCHAR(100), primary_key=True)
    email = db.Column(db.VARCHAR(50))
    password = db.Column(db.VARCHAR(128))
    roleid = db.Column(db.INT)
    fullname = db.Column(db.NVARCHAR(50))
    genderid = db.Column(db.BOOLEAN)
    birthday = db.Column(db.DATE)
    avatarlink = db.Column(db.VARCHAR(100))
    confirmed = db.Column(db.BOOLEAN)


    # class constructor
    def __init__(self, userid,email,password,roleid,fullname,genderid,birthday,avatarlink,confirm):
        """
        Class constructor
        """
        self.userid = userid
        self.email = email
        self.password = password
        self.roleid = roleid
        self.fullname = fullname
        self.genderid = genderid
        self.birthday = birthday
        self.avatarlink = avatarlink
        self.confirmed = confirm

    @classmethod
    def find_by_email(cls,email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def login_by_email_password(cls,email,password):
        return cls.query.filter_by(email=email).filter_by(password=password).first()

    @classmethod
    def find_by_id(cls,userid):
        return cls.query.filter_by(userid=userid).first()

    def add_n_update(self):
        db.session.add(self)
        db.session.commit()

    def check_user_password(self,password):
        return bcrypt.checkpw( password.encode('utf-8'),self.password.encode('utf-8'))

    def jsonify(self):
        return {'userid':self.userid,
                'email':self.email,
                'password':self.password,
                'roleid':self.roleid,
                'fullname':self.fullname,
                'genderid':self.genderid,
                'birthday':str(self.birthday),
                'avatarlink':self.avatarlink}