const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: String,
  products: [{ productId: String, quantity: Number }],
  status: { type: String, enum: ['PENDING', 'PAID', 'FULFILLED', 'CANCELLED'], default: 'PENDING' },
  paymentReceived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
