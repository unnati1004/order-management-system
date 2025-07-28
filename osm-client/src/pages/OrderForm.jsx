// src/pages/CreateOrder.jsx
import React, { useEffect, useState } from 'react';
import { getAllProducts, createOrder } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderForm() {
  const [customerId, setCustomerId] = useState('');
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([{ productId: '', quantity: 1 }]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const all = await getAllProducts();
      setProducts(all);
    }
    fetchProducts();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...orderItems];
    updated[index][field] = value;
    setOrderItems(updated);
  };

  const handleAddProduct = () => {
    setOrderItems([...orderItems, { productId: '', quantity: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validItems = orderItems.filter(item => item.productId && item.quantity > 0);

    if (!customerId || validItems.length === 0) {
      alert('Please provide customer ID and at least one valid product');
      return;
    }
    // console.log("Sending order data to backend:", order);

    await createOrder({ customerId, products: validItems });
    navigate('/orders');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">🛒 Create New Order</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Customer ID</label>
              <Input
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID"
              />
            </div>

            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center"
                >
                  <select
                    className="w-full border p-2 rounded"
                    value={item.productId}
                    onChange={(e) => handleChange(index, 'productId', e.target.value)}
                  >
                    <option value="">Select product</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                  </select>

                  <Input
                    type="number"
                    min="1"
                    className="w-24"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, 'quantity', Number(e.target.value))}
                    placeholder="Qty"
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddProduct}
                className="text-sm"
              >
                + Add another product
              </Button>
            </div>

            <Button type="submit" className="w-full mt-4 bg-blue-500">Place Order</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
