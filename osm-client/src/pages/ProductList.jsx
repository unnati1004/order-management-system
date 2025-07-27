// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }

    fetchProducts();
  }, []);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <Card className="shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Product List</h2>

          <Input
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">SKU</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-400">No products found</td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr key={product._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.sku}</td>
                      <td className="px-4 py-2">${product.price}</td>
                      <td className="px-4 py-2">{product.stock}</td>
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

export default ProductList;
