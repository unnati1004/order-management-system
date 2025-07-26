import React, { useEffect, useState } from 'react';
import { getAllOrders, getAllProducts, getAllCustomers } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, User, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const [o, p, c] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getAllCustomers(),
      ]);
      setOrders(o);
      setProducts(p);
      setCustomers(c);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <BarChart size={32} className="text-indigo-500 mb-2" />
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl font-bold">{orders.length}</p>
            <Button variant="link" onClick={() => navigate('/orders')}>View Orders</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Package size={32} className="text-green-500 mb-2" />
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-2xl font-bold">{products.length}</p>
            <Button variant="link" onClick={() => navigate('/products')}>View Products</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <User size={32} className="text-orange-500 mb-2" />
            <h2 className="text-lg font-semibold">Customers</h2>
            <p className="text-2xl font-bold">{customers.length}</p>
            <Button variant="link" onClick={() => navigate('/customers')}>View Customers</Button>
          </CardContent>
        </Card>
      </div>

      {/* Latest Orders */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">🕑 Recent Orders</h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(-5).reverse().map(order => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2">{order.customerId}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
