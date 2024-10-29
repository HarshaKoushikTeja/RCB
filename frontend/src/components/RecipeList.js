// RecipeList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/RecipeList.css'
const RecipeList = ({ recipes }) => (
  <div>
    <h2>Recipes</h2>
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RecipeList;
