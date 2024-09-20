from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Load recipes from JSON files
with open('veg_recipes.json') as f:
    veg_recipes = json.load(f)

with open('non_veg_recipes.json') as f:
    non_veg_recipes = json.load(f)

'''@app.route('/api/search', methods=['POST'])
def search_recipes():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    type = data.get('type', 'veg')

    print(f"Received ingredients: {ingredients} and type: {type}")

    if type == 'veg':
        recipes = veg_recipes
    else:
        recipes = non_veg_recipes

    results = []
    for recipe in recipes:
        if all(ingredient.strip() in recipe['ingredients'] for ingredient in ingredients):
            results.append(recipe)

    print(f"Search results: {results}")

    return jsonify(results)'''

@app.route('/api/search', methods=['POST'])
def search_recipes():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    type = data.get('type', 'veg')

    print(f"Received ingredients: {ingredients} and type: {type}")

    if type == 'veg':
        recipes = veg_recipes
    else:
        recipes = non_veg_recipes

    results = []
    for recipe in recipes:
        if all(ingredient.strip().lower() in (ingredient.lower() for ingredient in recipe['ingredients']) for ingredient in ingredients):
            recipe_with_type = recipe.copy()
            recipe_with_type['type'] = type
            results.append(recipe_with_type)

    print(f"Search results: {results}")

    return jsonify(results)


@app.route('/api/recipe/<int:id>', methods=['GET'])
def get_recipe(id):
    type = request.args.get('type', 'veg')
    print(f"Fetching recipe with id: {id} and type: {type}")

    if type == 'veg':
        recipes = veg_recipes
    else:
        recipes = non_veg_recipes

    recipe = next((r for r in recipes if r['id'] == id), None)
    if recipe:
        print(f"Found recipe: {recipe}")
        return jsonify(recipe)
    print("Recipe not found")
    return jsonify({"error": "Recipe not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
