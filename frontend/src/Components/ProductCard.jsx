// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
      <Link to={`/product/${product.id}`} className="no-underline
 rounded-md p-1 text-blue-500 hover:underline mt-2 block bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
