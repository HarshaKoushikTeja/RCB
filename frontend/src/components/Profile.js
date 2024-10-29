// src/components/Profile.js
import React from 'react';

const Profile = ({ recentSearches }) => {
  return (
    <div>
      <h2>Your Profile</h2>
      <h3>Recent Searches:</h3>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
