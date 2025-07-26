import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import { getAllOrders } from '@/services/api';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders() // replace with your endpoint
     //  const data = await res.json();/
      console.log(data);
      
      setOrders(data);
      setFiltered(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filteredOrders = orders.filter(order =>
      order.customerName.toLowerCase().includes(query) ||
      order.id.toLowerCase().includes(query)
    );
    setFiltered(filteredOrders);
  };

  const exportCSV = () => {
    const header = ['Order ID', 'Customer Name', 'Status', 'Total'];
    const rows = filtered.map(order => [
      order.id,
      order.customerName,
      order.status,
      order.total
    ]);

    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'orders.csv';
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Admin Orders Dashboard</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or order ID..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <Button
          variant="outline"
          onClick={exportCSV}
          className="flex items-center gap-2 text-indigo-600 hover:bg-indigo-50"
        >
          <Download size={16} />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center px-6 py-5 text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="bg-white hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">${order.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
