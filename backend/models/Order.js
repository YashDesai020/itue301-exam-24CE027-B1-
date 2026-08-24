const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  items: { type: Array, required: true },
  totalAmount: { type: Number, min: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'], 
    default: 'pending' 
  }
});

module.exports = mongoose.model('Order', orderSchema);
