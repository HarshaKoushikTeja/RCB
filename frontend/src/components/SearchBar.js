import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('veg');

  const handleSearch = () => {
    onSearch(query, type);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ingredients (comma-separated)"
      />
      <div>
        <label>
          <input
            type="radio"
            value="veg"
            checked={type === 'veg'}
            onChange={(e) => setType(e.target.value)}
          />
          Veg
        </label>
        <label>
          <input
            type="radio"
            value="non-veg"
            checked={type === 'non-veg'}
            onChange={(e) => setType(e.target.value)}
          />
          Non-Veg
        </label>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
