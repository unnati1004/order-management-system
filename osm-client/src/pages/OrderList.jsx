import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, updateOrderStatus } from "../services/api";
import { createSocket } from "@/socket";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        // console.log("Fetched orders:", data);
        
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    fetchOrders();

    const socket = createSocket ();
    if (socket) {
      socket.on('orderStatusUpdated', ({ id, status }) => {
        setOrders(prev =>
          prev.map(order =>
            order._id === id ? { ...order, status } : order
          )
        );
      });

     // ✅ Cleanup on unmount
    return () => {
      socket.off("orderStatusUpdated");
      socket.disconnect(); // disconnect the socket
    };
    }
  }, []);
  
  const filteredOrders = orders.filter((order) =>
    order.customerId?.toString().toLowerCase().includes(search.toLowerCase())
  );
  
  const handleStatusChange = async (orderId, newStatus) => {
  try {
    const updated = await updateOrderStatus(orderId, newStatus); // ✅ Just the status string

    setOrders((prev) =>
      prev.map((o) => (o._id === updated._id ? updated : o))
    );
  } catch (err) {
    console.error("Failed to update status:", err);
  }
};
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">📋 All Orders</h2>
        <button
          onClick={() => navigate("/create-order")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          ➕ Create Order
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by Customer ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-sm text-left">
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
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order?._id} className="border-t hover:bg-gray-50">
                  <td className="border p-2">{order?._id}</td>
                  <td className="border p-2">{order?.customerId}</td>
                  <td className="border p-2">
                    {order.products.map((p) => (
                      <div key={p?.productId}>
                        {p?.productId} (x{p.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="border p-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border p-1 rounded"
                    >
                      {["PENDING", "PAID", "FULFILLED", "CANCELLED"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">x
                    {new Date(order?.createdAt).toLocaleString()}
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
