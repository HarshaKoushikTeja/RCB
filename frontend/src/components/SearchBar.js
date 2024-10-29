// SearchBar.js
import React, { useState } from 'react';
import '../Styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('veg');

  const handleSearch = () => {
    const token = localStorage.getItem('token'); // Retrieve JWT token

    if (token) {
      onSearch(query, type, token); // Pass the token along with query and type to onSearch
    } else {
      console.error("User is not authenticated. Please log in.");
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
