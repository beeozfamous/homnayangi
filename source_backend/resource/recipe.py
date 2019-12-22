from flask_restful import Resource,reqparse
from flask_jwt import jwt_required
from source_backend.model.RecipeModel import RecipeModel


class Recipe(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('price',
                        type==float,
                        required=True,
                        help="This field cannot be blank!")

    @jwt_required()
    def get(self,foodname):
        recipe = RecipeModel.find_by_name(foodname)
        if recipe:
            return {'message':'successful',
                    'items':recipe.jsonify()}
        else:
            return {'message':'fail'},404


    def post(self,foodname):
        if RecipeModel.find_by_name(foodname):
            return {'message':"An item with name '{}' already exists." .format(foodname)},400
        data = Recipe.parser.parse_args()
        recipe = RecipeModel(6969,data['owner_id'],foodname,data['ingredients'],data['image'])
        try:
            recipe.add_n_update()
        except:
            return {'message':'cannot add new recipe'}
        return recipe.jsonify(),201
    def delete(self,foodname):
        recipe = RecipeModel.find_by_name(foodname)
        if recipe:
            recipe.delete()
        return {'message':"Item with name {} have been deleted" .format(foodname)}
    def put(self,foodname):
        data = Recipe.parser.parse_args()

        recipe = RecipeModel.find_by_name(foodname)
        if recipe is None:
            pass
        else:
            pass
        return {'message':'do not thing'}

class RecipeList(Resource):
    def get(self):
        return{'recipes':[recipe.jsonify() for recipe in RecipeModel.query.all() ]}