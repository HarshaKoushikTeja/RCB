import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  /*const handleSearch = (query, type) => {
    const ingredients = query.split(',').map(item => item.trim());  // Ensure trimming of whitespace
    axios.post('/api/search', { ingredients, type })
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  };*/
  const handleSearch = (query, type) => {
    const ingredients = query.split(',').map(item => item.trim());  // Ensure trimming of whitespace
    console.log(`Searching for ingredients: ${ingredients} and type: ${type}`);
    axios.post('/api/search', { ingredients, type })
      .then(response => {
        console.log('Search results:', response.data);
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  };
  

  return (
    <Router>
      <div>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<RecipeList recipes={recipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
