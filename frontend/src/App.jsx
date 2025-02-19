// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// Admin pages

import Orders from './Pages/Orders';
import Users from './Pages/Users';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import ProductDetail from './Pages/ProductDetail';
import Dashboard from './Pages/Dashboard';
import ManageProducts from './Pages/ManageProducts';
import Header from './Components/Header';

const App = () => {
  return (
    <Router>

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<ManageProducts />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
