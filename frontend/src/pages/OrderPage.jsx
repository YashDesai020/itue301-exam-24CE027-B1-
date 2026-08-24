import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const OrderPage = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    restaurantId: '',
    itemName: '',
    quantity: 1,
    address: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          restaurantId: formData.restaurantId,
          items: [{ name: formData.itemName, quantity: formData.quantity }],
          totalAmount: formData.quantity * 10,
          address: formData.address
        })
      });

      if (response.ok) {
        setStatusMessage('Order placed successfully!');
      } else {
        const errData = await response.json();
        setStatusMessage(`Error: ${errData.message}`);
      }
    } catch (err) {
      setStatusMessage('Failed to submit order');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input
          type="text"
          name="restaurantId"
          placeholder="Restaurant ID"
          value={formData.restaurantId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Order</button>
      </form>

      {statusMessage && <p style={{ marginTop: '15px' }}>{statusMessage}</p>}

      <div style={{ marginTop: '20px', background: '#f5f5f5', padding: '10px' }}>
        <h4>Live Form State Preview:</h4>
        <p>Selected Restaurant ID: {formData.restaurantId}</p>
        <p>Item: {formData.itemName} (x{formData.quantity})</p>
      </div>
    </div>
  );
};

export default OrderPage;
