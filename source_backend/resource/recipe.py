import json
import os
import uuid

import boto3 as boto3
import werkzeug
from flask import jsonify
from flask_restful import Resource,reqparse
from flask_jwt import jwt_required
from source_backend.model.RecipeModel import RecipeModel
from source_backend.model.UserModel import UserModel

UPLOAD_FOLDER = "FoodImage"
BUCKET = "hnag"


class Recipe(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('owner_id',
                        type==float,
                        required=True,
                        help="This field cannot be blank!")
    parser.add_argument('foodname',
                        type == float,
                        required=True,
                        help="This field cannot be blank!")
    parser.add_argument('description',
                        type == float,
                        required=True,
                        help="This field cannot be blank!")
    parser.add_argument('ingredients',
                        type == float,
                        required=True,
                        help="This field cannot be blank!")
    parser.add_argument('image', type=werkzeug.datastructures.FileStorage, location='files',
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


    def post(self):
        data = Recipe.parser.parse_args()

        f = data['image']
        imageID=str(uuid.uuid1())
        s3_client = boto3.client('s3')
        s3_client.put_object(Body=f,
                          Bucket=BUCKET,
                          Key=UPLOAD_FOLDER+'/'+imageID+'.jpg')

        recipe = RecipeModel(None,data['owner_id'],data['foodname'],data['description'],data['ingredients'],'https://hnag.s3-ap-southeast-1.amazonaws.com/FoodImage/'+imageID+'.jpg')
        try:
            recipe.add_n_update()
        except:
            return {'message':'cannot add new recipe'}
        recipe.add_n_update()
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
        # foodDetail = RecipeModel.query.join(UserModel,RecipeModel.ownerid==UserModel.userid).add_columns(RecipeModel.ownerid,UserModel.fullname).filter(RecipeModel.ownerid==UserModel.userid)
        # print([jsonify(recipe) for recipe in foodDetail])
        #return {'recipes':[dict((recipe)) for recipe in foodDetail]}