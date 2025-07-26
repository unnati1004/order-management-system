import React, { useState } from 'react';
import { createOrder } from '../services/api';

function OrderForm() {
  const [customerId, setCustomerId] = useState('');
  const [products, setProducts] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productList = products.split(',').map(p => {
      const [id, qty] = p.split(':');
      return { productId: id, quantity: +qty };
    });
    await createOrder({ customerId, products: productList });
    alert('Order created!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={customerId} onChange={e => setCustomerId(e.target.value)} placeholder="Customer ID" required />
      <input value={products} onChange={e => setProducts(e.target.value)} placeholder="ProductID:Qty,ProductID:Qty" required />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderForm;