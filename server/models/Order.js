// models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  priceAtPurchase: Number,
});

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'FULFILLED', 'CANCELLED'],
    default: 'PENDING'
  },
  products: [orderItemSchema],
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
