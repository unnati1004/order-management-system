const mongoose = require('mongoose');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Product = require('./models/Product'); // Adjust path as needed

const MONGO_URI="mongodb+srv://unnatigandhi1999:MiniProject@cluster0.q53hrkf.mongodb.net/Ordermanagement?retryWrites=true&w=majority"

async function seedProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    const formatted = products.map((p, i) => ({
      name: p.title,
      sku: `SKU-${i + 1}`,
      price: p.price,
      stock: Math.floor(Math.random() * 20) + 1,
    }));

    await Product.insertMany(formatted);
    // console.log('✅ Products seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding products:', err.message);
    process.exit(1);
  }
}

seedProducts();