import json
import secrets  # Import the secrets module
import os  # Move this import to the top
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from pymongo import MongoClient
from datetime import timedelta  # Import here for proper usage

# Generate a random 256-bit key and convert it to hexadecimal
secret_key = secrets.token_hex(32)
print(f"Generated JWT Secret Key: {secret_key}")  # Print the key for reference

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# JWT and password hashing setup
app.config['JWT_SECRET_KEY'] = secret_key  # Use the generated key here
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # JWT Token Expiry (e.g., 1 hour)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# MongoDB setup
# client = MongoClient("mongodb+srv://muneebahmed2786:recipe%40chatbot@cluster0.vabhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
from pymongo import MongoClient

client = MongoClient("mongodb+srv://muneebahmed2786:harsha@cluster0.8qbwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.get_database("user_db")
user_collection = db.users

# Load recipes from JSON files
try:
    with open('veg_recipes.json') as f:
        veg_recipes = json.load(f)
    with open('non_veg_recipes.json') as f:
        non_veg_recipes = json.load(f)
except FileNotFoundError:
    veg_recipes = []
    non_veg_recipes = []

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if user_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_id = user_collection.insert_one({
        "email": email,
        "password": hashed_password
    }).inserted_id

    return jsonify({"message": "User created", "user_id": str(user_id)}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = user_collection.find_one({"email": email})
    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify({"token": access_token}), 200
    return jsonify({"error": "Invalid email or password"}), 401

# Recipe search route
@app.route('/api/search', methods=['POST'])
@jwt_required()  # Protect this route
def search_recipes():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    recipe_type = data.get('type', 'veg')

    recipes = veg_recipes if recipe_type == 'veg' else non_veg_recipes
    results = [
        {**recipe, "type": recipe_type} for recipe in recipes
        if all(ingredient.lower() in map(str.lower, recipe['ingredients']) for ingredient in ingredients)
    ]

    return jsonify(results), 200

# Recipe detail route
@app.route('/api/recipe/<int:id>', methods=['GET'])
@jwt_required()  # Protect this route
def get_recipe(id):
    recipe_type = request.args.get('type', 'veg')
    recipes = veg_recipes if recipe_type == 'veg' else non_veg_recipes
    recipe = next((r for r in recipes if r['id'] == id), None)
    
    if recipe:
        return jsonify(recipe), 200
    return jsonify({"error": "Recipe not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
