// src/pages/MyOrders.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/orders/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading your orders...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders?.map(order => (
            <div key={order._id} className="border p-4 rounded-md shadow bg-white">
              <div className="text-sm text-gray-600">Order ID: {order._id}</div>
              <div className="font-medium">Status: <span className="text-blue-600">{order.status}</span></div>
              <div className="mt-2">
                <h3 className="font-semibold">Products:</h3>
                <ul className="list-disc ml-5 text-sm">
                  {order.products.map((item, idx) => (
                    <li key={idx}>
                      {item.product?.name || 'Unknown Product'} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
