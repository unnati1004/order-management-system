// models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  priceAtPurchase: Number,
});

const orderSchema = new mongoose.Schema(
  {
    customerId : {type: String},
    status: {
      type: String,
      enum: ['PLACED', 'PICKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED',
    },
    products: [orderItemSchema],
    paymentReceived: { type: Boolean, default: false }, // ✅ New field
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
