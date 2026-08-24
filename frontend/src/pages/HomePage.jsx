import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { token, login, logout } = useContext(AuthContext);

  const handleMockLogin = () => {
    login({ name: 'Test Customer', email: 'test@example.com' }, 'mock-jwt-token');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to QuickBite</h1>
      <p>Order food from your favorite local restaurants.</p>
      {token ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleMockLogin}>Mock Login (Sets Token)</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
