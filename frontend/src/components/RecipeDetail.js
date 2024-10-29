// RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError('Failed to fetch recipe.');
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
