import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import About from './components/About';
import Contact from './components/Contact';

import Signup from './components/Signup'; // Add your Signup component
import Login from './components/Login';     // Add your Login component
import './Styles/App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query, type) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/search', { ingredients: query.split(','), type });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <Router>
      <div>
        <Navbar />
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<RecipeList recipes={recipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} /> {/* Add your Signup route */}
          <Route path="/login" element={<Login />} />   {/* Add your Login route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
