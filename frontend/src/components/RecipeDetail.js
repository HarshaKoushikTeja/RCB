import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RecipeDetail = () => {
  const { id } = useParams();
  const query = useQuery();
  const [recipe, setRecipe] = useState(null);
  const type = query.get('type');

  useEffect(() => {
    console.log(`Fetching recipe with id: ${id} and type: ${type}`);
    axios.get(`/api/recipe/${id}?type=${type}`)
      .then(response => {
        console.log('Recipe details fetched:', response.data);
        setRecipe(response.data);
      })
      .catch(error => console.error('Error fetching recipe details:', error));
  }, [id, type]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <h3>Nutritional Information</h3>
      <p>Protein: {recipe.nutrients.protein}g</p>
      <p>Carbs: {recipe.nutrients.carbs}g</p>
      <p>Fat: {recipe.nutrients.fat}g</p>
      {recipe.nutrients.fiber && <p>Fiber: {recipe.nutrients.fiber}g</p>}
      {recipe.nutrients.vitamin_a && <p>Vitamin A: {recipe.nutrients.vitamin_a}%</p>}
      {recipe.nutrients.vitamin_c && <p>Vitamin C: {recipe.nutrients.vitamin_c}%</p>}
      {recipe.nutrients.calcium && <p>Calcium: {recipe.nutrients.calcium}%</p>}
      {recipe.nutrients.iron && <p>Iron: {recipe.nutrients.iron}%</p>}
      {recipe.nutrients.omega_3 && <p>Omega-3: {recipe.nutrients.omega_3}mg</p>}
      {recipe.nutrients.vitamin_d && <p>Vitamin D: {recipe.nutrients.vitamin_d}mcg</p>}
      {recipe.nutrients.vitamin_b12 && <p>Vitamin B12: {recipe.nutrients.vitamin_b12}mcg</p>}
      {recipe.nutrients.selenium && <p>Selenium: {recipe.nutrients.selenium}mcg</p>}
      {recipe.nutrients.zinc && <p>Zinc: {recipe.nutrients.zinc}mg</p>}
      {recipe.nutrients.niacin && <p>Niacin: {recipe.nutrients.niacin}mg</p>}
      {recipe.nutrients.potassium && <p>Potassium: {recipe.nutrients.potassium}mg</p>}
      <p>Calories: {recipe.calories}</p>
    </div>
  );
};

export default RecipeDetail;
