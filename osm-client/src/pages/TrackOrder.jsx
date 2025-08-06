import { useState, useEffect } from 'react';
import { createSocket } from '@/socket';
import { Loader2 } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = createSocket();

    if (socket) {
      socket.on('orderStatusUpdated', ({ id, status }) => {
        toast.info(`Order ${id} status updated to ${status}`);
        if (order && id === order._id) {
          setOrder(prev => ({ ...prev, status }));
        }
      });

      return () => {
        socket.off("orderStatusUpdated");
        socket.disconnect();
      };
    }
  }, [order]);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setOrder(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order not found');
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-24 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
        📦 Track Your Order
      </h1>

      <form onSubmit={handleTrack} className="space-y-5">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          className="w-full p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Searching...
            </>
          ) : (
            'Track Order'
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
      )}

      {order && (
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
          <p className="text-gray-700"><strong>🆔 Order ID:</strong> {order._id}</p>
          <p className="text-gray-700"><strong>📌 Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
              order.status === 'PLACED' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'PICKED' ? 'bg-blue-100 text-blue-800' :
              order.status === 'SHIPPED' ? 'bg-green-100 text-green-800' :
              order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
              order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''
            }`}>
              {order.status}
            </span>
          </p>
          <p className="text-gray-700"><strong>💰 Payment Received:</strong> {order.paymentReceived ? 'Yes ✅' : 'No ❌'}</p>
          <div>
            <p className="text-gray-700 font-semibold">🛍️ Products:</p>
            <ul className="list-disc ml-6 mt-1 text-gray-600">
              {order.products.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name || 'Unnamed Product'} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
