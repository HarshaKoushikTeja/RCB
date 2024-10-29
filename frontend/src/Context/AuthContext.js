// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addRecentSearch = (search) => {
    setRecentSearches((prevSearches) => [...prevSearches, search]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, recentSearches, addRecentSearch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
