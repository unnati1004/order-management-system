// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany();
await Product.deleteMany();

await User.create({ email: 'admin@oms.com', name: 'Admin', role: 'admin' });

await Product.insertMany([
  { name: 'Test Product A', price: 100 },
  { name: 'Test Product B', price: 200 }
]);

console.log('Seeding done');
process.exit();
