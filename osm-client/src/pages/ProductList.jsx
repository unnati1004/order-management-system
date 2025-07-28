import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/api';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
              📦 Product List
            </h2>
            <Button
              onClick={() => navigate('/add-product')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm shadow-sm"
            >
              ➕ Add Product
            </Button>
          </div>

          <Input
            placeholder="🔍 Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 shadow-sm"
          />

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">SKU</th>
                  <th className="text-left px-4 py-2">Price</th>
                  <th className="text-left px-4 py-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      No products found 😞
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-4 py-2 font-medium text-gray-800">{product.name}</td>
                      <td className="px-4 py-2 text-gray-600">{product.sku}</td>
                      <td className="px-4 py-2 text-gray-600">₹{product.price}</td>
                      <td className="px-4 py-2 text-gray-600">{product.stock}</td>
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
