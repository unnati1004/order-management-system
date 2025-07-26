// src/components/OrderList.jsx
import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/api';
import socket from '../socket';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }

    fetchOrders();
     // Set up WebSocket connection
    socket.on('orderStatusUpdated', ({ id, status }) => {
     setOrders((prevOrders) =>
       prevOrders.map((order) =>
         order._id === id ? { ...order, status } : order
       )
     );
   });

   return () => {
     socket.off('orderStatusUpdated');
   };
  }, []);

  const filteredOrders = orders.filter(order =>
    order.customerId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      
      <input
        type="text"
        placeholder="Search by Customer ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer ID</th>
              <th className="border p-2">Products</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">No orders found</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">{order.customerId}</td>
                  <td className="border p-2">
                    {order.products.map(p => (
                      <div key={p.productId}>
                        {p.productId} (x{p.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
