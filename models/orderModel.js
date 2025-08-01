const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String },
      price: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);