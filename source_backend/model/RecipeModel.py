from database_config import db

class RecipeModel(db.Model):
    __tablename__= 'recipe_posts'
    postid = db.Column(db.INTEGER,primary_key=True,nullable=False)
    ownerid = db.Column(db.VARCHAR(50),nullable=False)
    foodname = db.Column(db.VARCHAR(50),nullable=False)
    description = db.Column(db.TEXT,nullable=False)
    ingredients = db.Column(db.TEXT,nullable=False)
    image = db.Column(db.TEXT,nullable=False)
    def __init__(self,postid,ownerid,foodname,description,ingredients,image):
        self.postid = postid
        self.ownerid = ownerid
        self.foodname = foodname
        self.description = description
        self.ingredients = ingredients
        self.image = image

    def jsonify(self):
        return {'post_id':self.postid,
                'owner_id':self.ownerid,
                'food_name':self.foodname,
                'description':self.description,
                'ingredients':self.ingredients,
                'image':self.image}
    @classmethod
    def find_by_name(cls,foodname):
        return RecipeModel.query.filter_by(foodname=foodname).first()
    def add_n_update(self):
        db.session.add(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()