// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-24">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-6 text-gray-700">Page not found</p>
      <Link to="/" className="text-indigo-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
