// SearchBar.js
import React, { useState } from 'react';
import '../Styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('veg'); // Default type can be 'veg'

  const handleSearch = () => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    if (token) {
      // Create the ingredients array
      const ingredientsArray = query.split(',').map(ingredient => ingredient.trim());
      // Ensure you send type correctly as a string
      onSearch({ ingredients: ingredientsArray, type }, token);
    } else {
      alert("Please log in to search for recipes.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter ingredients"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="veg">Veg</option>
        <option value="non-veg">Non-Veg</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
