import React, { useState } from 'react';
import { createOrder } from '../services/api';

function OrderForm() {
  const [customerId, setCustomerId] = useState('');
  const [products, setProducts] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productList = products.split(',').map(p => {
      const [id, qty] = p.split(':');
      return { productId: id.trim(), quantity: +qty };
    });
    await createOrder({ customerId, products: productList });
    alert('✅ Order created!');
    setCustomerId('');
    setProducts('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create New Order</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
          <input
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
            placeholder="e.g., 12345"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Products (ProductID:Qty,...)</label>
          <input
            value={products}
            onChange={e => setProducts(e.target.value)}
            placeholder="e.g., P001:2,P002:3"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
