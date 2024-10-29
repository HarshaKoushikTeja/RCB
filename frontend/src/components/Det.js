import React from 'react';

export default function Det({ item }) { // Expect individual recipe item
  return (
    <div>
      <ul> {/* Use an unordered list for each item */}
        {Object.entries(item).map(([key, value]) => ( // Loop through each key-value pair
          <li  key={key}>{`${key}: ${value}`}</li> // Display key and value
        ))}
      </ul>
    </div>
  );
}
