// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/auth";
// import { useEffect, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    // logoutUser();
    logout();
    navigate("/login");
  };

  const dashboardPath = user?.user.role === "admin" ? "/admin-dashboard" : "/";

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <Link to={dashboardPath} className="font-semibold text-lg">
          Dashboard
        </Link>

        {user?.user.role === "admin" && (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/products">Products</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/trackorder">Track Order</Link>
          </>
         )} 
         {user?.user.role === 'customer' && (
          <>
            <Link to="/my-orders">
             My Orders
            </Link>
            <Link to="/trackorder">
              Track Order
            </Link>
          </>
        )}
      </div>
        
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            👤 {user.user.name} ({user.user.role})
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
