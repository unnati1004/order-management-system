// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
