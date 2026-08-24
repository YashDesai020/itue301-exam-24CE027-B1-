import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/restaurants" style={{ marginRight: '15px' }}>Restaurants</Link>
      <Link to="/order" style={{ marginRight: '15px' }}>Order (Protected)</Link>
      <Link to="/admin">Admin Panel</Link>
    </nav>
  );
};

export default Navigation;
