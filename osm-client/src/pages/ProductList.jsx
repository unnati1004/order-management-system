// src/pages/CustomerList.jsx
import React, { useEffect, useState } from 'react';
import { getAllCustomers } from '../services/api';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    }

    fetchCustomers();
  }, []);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <Card className="shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">👥 Customer List</h2>

          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-400">No customers found</td>
                  </tr>
                ) : (
                  filtered.map((customer) => (
                    <tr key={customer._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{customer.name}</td>
                      <td className="px-4 py-2">{customer.email}</td>
                      <td className="px-4 py-2">{customer.phone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerList;