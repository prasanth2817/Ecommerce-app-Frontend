import React from 'react'
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="container products-text">
        <h3>Admin Dashboard</h3>
        <ul>
            <li><Link to="/addproduct">Create Product</Link></li>
            <li><Link to="/editproduct">Edit Product</Link></li>
            <li><Link to="/deleteproduct">Delete Product</Link></li>
        </ul>
    </div>
);
}

export default AdminDashboard