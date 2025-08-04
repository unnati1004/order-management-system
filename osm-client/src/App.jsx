// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import ProductForm from './pages/ProductForm';
import CustomerForm from './pages/CustomerForm';
import CustomerList from './pages/CustomerList';
import ProductList from './pages/ProductList';
import OrderForm from './pages/OrderForm';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/protectedRoutes';
// import MyOrders from './pages/MyOrders';
import TrackOrder from './pages/TrackOrder';
import MyOrders from './pages/MyOrders';
// import MyOrders from './pages/MyOrders';
import { Toaster } from "sonner";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster richColors position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-20 px-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/admin-dashboard" role="admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                   </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrderList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-order"
                element={
                  <ProtectedRoute>
                    <OrderForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/my-orders"
                element={
                  <ProtectedRoute>
                    <MyOrders/>
                   </ProtectedRoute> 
                }
              /> */}
              <Route
                path="/add-product"
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute> 
                }
              />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute>
                    <CustomerList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers/new"
                element={
                  <ProtectedRoute>
                    <CustomerForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trackorder"
                element={
                    <TrackOrder />
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
   </AuthProvider>
  );
}

export default App;
