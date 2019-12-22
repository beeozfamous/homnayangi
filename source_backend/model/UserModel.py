from database_config import db


class UserModel(db.Model):
    __tablename__ = 'users'

    userid = db.Column(db.VARCHAR(50), primary_key=True)
    email = db.Column(db.VARCHAR(50), nullable=False)
    password = db.Column(db.VARCHAR(50), unique=True, nullable=False)
    roleid = db.Column(db.SMALLINT, nullable=True,)
    fullname = db.Column(db.VARCHAR(50), nullable=False)
    genderid = db.Column(db.BOOLEAN, nullable=True)
    birthday = db.Column(db.DATE, nullable=True)
    avatarlink = db.Column(db.VARCHAR(100),nullable=True)

    # class constructor
    def __init__(self, userid,email,password,roleid,fullname,genderid,birthday,avatarlink):
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

    def jsonify(self):
        return {'userid':self.userid,
                'email':self.email,
                'password':self.password,
                'roleid':self.roleid,
                'fullname':self.fullname,
                'genderid':self.genderid,
                'birthday':str(self.birthday),
                'avatarlink':self.avatarlink}