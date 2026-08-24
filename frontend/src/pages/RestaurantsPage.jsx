import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/restaurants')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch restaurants');
        return res.json();
      })
      .then((data) => setRestaurants(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading restaurants...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Restaurants</h2>
      <input
        type="text"
        placeholder="Search by name or cuisine..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '100%', maxWidth: '300px' }}
      />
      {filteredRestaurants.map((res) => (
        <RestaurantCard
          key={res._id || res.name}
          name={res.name}
          cuisine={res.cuisine}
          rating={res.rating}
          isOpen={res.isOpen}
        />
      ))}
    </div>
  );
};

export default RestaurantsPage;
