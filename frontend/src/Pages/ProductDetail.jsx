// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderProduct from './OrderProduct';
import Header from '../Components/Header';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <Header/>
    <div className="container mx-auto px-4 py-6">

<div className="flex flex-col md:flex-row gap-6">
  <img 
    src={product.image} 
    alt={product.name} 
    className="w-full md:w-1/2 object-cover rounded"
  />
  <div className="md:w-1/2">
    <h1 className="text-3xl font-bold">{product.name}</h1>
    <p className="text-xl text-gray-600">₹{product.price}</p>
    <p className="mt-4">{product.description}</p>
    <OrderProduct 
      productId={product.id} 
      productName={product.name} 
      productPrice={product.price} 
    />
  </div>
</div>
</div>
    </div>

  );
};

export default ProductDetail;
