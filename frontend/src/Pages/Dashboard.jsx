import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const getAllProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products", { method: "GET" });
    const data = await response.json();
    setProducts(data);
  };

  const getAllOrder = async () => {
    const response = await fetch("http://localhost:5000/api/orders/all", { method: "GET", credentials: "include" });
    const data = await response.json();
    setOrders(data.orders);
  };

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:5000/api/auth/users", { method: "GET", credentials: "include" });
    const data = await response.json();
    setUsers(data.users);
  };

  useEffect(() => {
    getAllProducts();
    getAllOrder();
    getAllUsers();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" });
      if (response.ok) {
        alert("Logout successful");
        window.location.href = "/login";
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white p-6 md:min-h-screen">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4"><Link to="/dashboard" className="hover:text-gray-300 no-underline text-white">Dashboard Home</Link></li>
            <li className="mb-4"><Link to="/dashboard/products" className="hover:text-gray-300 no-underline text-white">Manage Products</Link></li>
            <li className="mb-4"><Link to="/dashboard/orders" className="hover:text-gray-300 no-underline text-white">Orders</Link></li>
            <li className="mb-4"><Link to="/dashboard/users" className="hover:text-gray-300 no-underline text-white">Users</Link></li>
            <li><button className="bg-rose-500 text-white rounded-md p-2 w-full" onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <header className="mb-6 text-center md:text-left">
          <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
          <p className="text-gray-600">Overview of your product store performance.</p>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 p-6 rounded shadow">
            <h2 className="text-xl font-bold text-white">Total Products</h2>
            <p className="text-3xl font-semibold mt-2 text-white">{products&&products.length}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6 rounded shadow">
            <h2 className="text-xl font-bold text-white">Total Orders</h2>
            <p className="text-3xl font-semibold mt-2 text-white">{orders&&orders.length}</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded shadow">
            <h2 className="text-xl font-bold text-white">Total Users</h2>
            <p className="text-3xl font-semibold mt-2 text-white">{orders&&users.length}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
