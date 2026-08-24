const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Customer = require('./models/Customer');
const Restaurant = require('./models/Restaurant');
const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(cors());

// Task 3: Global Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`);
  next();
});

// Task 3: Custom authGuard Middleware
const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }
  req.user = { id: 'dummyCustomerId' }; // Simplified auth attachment
  next();
};

// Task 3 & 5: Routes
app.post('/api/v1/auth/login', (req, res) => {
  res.status(200).json({ message: 'Login successful', token: 'mock-jwt-token' });
});

app.get('/api/v1/restaurants', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/orders', authGuard, async (req, res, next) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/orders', authGuard, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('restaurantId', 'name cuisine');
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/v1/orders/:id/status', authGuard, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true, runValidators: true }
    );
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

// Task 3 & 5: Global Error-Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.name === 'ValidationError' ? 400 : 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

// Task 5: Database Connection
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

startServer();
