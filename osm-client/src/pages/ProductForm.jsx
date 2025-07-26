import React, { useState } from 'react';
import { createProduct } from '../services/api';

const ProductForm = () => {
  const [form, setForm] = useState({ name: '', sku: '', price: '', stock: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      setMessage('Product added successfully');
      setForm({ name: '', sku: '', price: '', stock: '' });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error adding product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} type="number" />
        <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} type="number" />
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductForm;