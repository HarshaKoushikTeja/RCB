import json
import secrets
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

# Generate a random 256-bit key and convert it to hexadecimal
secret_key = secrets.token_hex(32)
print(f"Generated JWT Secret Key: {secret_key}")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB setup
client = MongoClient("mongodb+srv://muneebahmed2786:harsha@cluster0.8qbwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.get_database("user_db")
user_collection = db.users
recipe_collection = db.recipes  # Create a collection for recipes

# Recipe search route

@app.route('/api/search', methods=['POST'])
def search_recipes():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    recipe_type = data.get('type', 'veg')  # Get the recipe type correctly

    print(f"Received ingredients: {ingredients} and type: {recipe_type}")  # Log received data

    # Query the MongoDB collection for recipes
    results = []
    cursor = recipe_collection.find({"type": recipe_type})

    for recipe in cursor:
        # Check if all ingredients are present in the recipe
        if all(ingredient.strip().lower() in (ingredient.lower() for ingredient in recipe['ingredients']) for ingredient in ingredients):
            results.append(recipe)

    print(f"Search results: {results}")  # Log search results

    return jsonify(results)
 
# Recipe details route
@app.route('/api/recipe/<int:id>', methods=['GET'])
def get_recipe(id):
    print(f"Fetching recipe with id: {id}")

    recipe = recipe_collection.find_one({"id": id})
    
    if recipe:
        print(f"Found recipe: {recipe}")
        return jsonify(recipe)
    
    print("Recipe not found")
    return jsonify({"error": "Recipe not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
