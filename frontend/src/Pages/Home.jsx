// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import Header from '../Components/Header';


const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
   <Header/>

   <div className='flex flex-col gap-3 col-6 mt-24 ml-24 p-5'>
    <h1 className='font-bold text-4xl text-[#d35400]'>🛍️ Welcome to Product Store-Your One-Stop Shop for Quality Products!</h1>
    <p className=' text-justify line-height-3 text-base/7'>Discover a seamless shopping experience with our wide range of high-quality products at unbeatable prices. Whether you're looking for the latest gadgets, trendy fashion, or everyday essentials, we’ve got you covered. Browse, shop, and enjoy hassle-free online shopping with secure payments and fast delivery. Start exploring today! 🚀</p>
   </div>
    <div className="container mx-auto px-4 py-6">

<h1 className=" font-bold mb-6 text-center">Products</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
</div>
    </div>

  );
};

export default Home;
