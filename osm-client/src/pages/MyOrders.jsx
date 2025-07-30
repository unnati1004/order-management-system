import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { FaBoxOpen, FaClock, FaHashtag } from 'react-icons/fa';
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/my`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      } finally {
        setLoading(false);
      }
    };

    if(user?.token) fetchOrders();
  }, [user]);

  if (loading) return <div className="p-4 text-center text-lg font-medium">⏳ Loading your orders...</div>;

return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white border shadow-md rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaHashtag className="text-blue-600" />
                  <span className="text-sm font-medium">Order ID:</span>
                  <span className="text-sm">{order._id}</span>
                </div>
                <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  {order.status}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
                  <FaBoxOpen className="text-green-600" /> Products:
                </h3>
                <ul className="ml-6 list-disc text-sm text-gray-700 space-y-1">
                  {order.products.map((item, idx) => (
                    <li key={idx}>
                      {item.productId?.name || 'Unknown Product'} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-500 mt-4 flex items-center gap-2">
                <FaClock className="text-gray-400" />
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
