// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4 flex gap-6">
      <Link to="/">Dashboard</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/products">Products</Link>
      <Link to="/customers">Customers</Link>
    </nav>
  );
}
