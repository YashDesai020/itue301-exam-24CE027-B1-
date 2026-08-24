import React from 'react';

const RestaurantCard = ({ name, cuisine, rating, isOpen }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
      <h3>{name}</h3>
      <p><strong>Cuisine:</strong> {cuisine}</p>
      <p><strong>Rating:</strong> {rating} / 5</p>
      <p>
        <strong>Status: </strong>
        <span style={{ color: isOpen ? 'green' : 'red', fontWeight: 'bold' }}>
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
      </p>
    </div>
  );
};

export default RestaurantCard;
