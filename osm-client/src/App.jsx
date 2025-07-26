// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import ProductForm from './pages/ProductForm';
import CustomerForm from './pages/CustomerForm';
import CustomerList from './pages/CustomerList';
import ProductList from './pages/ProductList';
import OrderForm from './pages/OrderForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/new" element={<OrderForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
