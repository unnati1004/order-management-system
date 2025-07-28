import { useState, useEffect } from 'react';
import { createSocket } from '@/socket';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = createSocket();

    if (socket) {
      socket.on('orderStatusUpdated', ({ id, status }) => {
        if (order && id === order._id) {
          setOrder(prev => ({ ...prev, status }));
        }
      });

     // ✅ Cleanup on unmount
    return () => {
      socket.off("orderStatusUpdated");
      socket.disconnect(); // disconnect the socket
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
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Track Your Order</h1>
      <form onSubmit={handleTrack} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {order && (
        <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Received:</strong> {order.paymentReceived ? 'Yes' : 'No'}</p>
          <p><strong>Products:</strong></p>
          <ul className="list-disc ml-6">
            {order.products.map((item, idx) => (
              <li key={idx}>
                {item.product?.name || 'Product'} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
  