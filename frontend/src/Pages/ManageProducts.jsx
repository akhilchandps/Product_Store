// src/pages/ManageProducts.jsx
import React, { useEffect, useState } from 'react';
import AddModal from '../Components/AddModal';
import EditModal from '../Components/EditModal';

const ManageProducts = () => {
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
  <div className="container mx-auto px-4 py-6">

<AddModal onProductAdded={getProducts} />
<h1 className="text-3xl font-bold mb-6">Manage Products</h1>
<table className="w-full table-auto bg-white rounded shadow">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-2 text-left">ID</th>
      <th className="p-2 text-left">Name</th>
      <th className="p-2 text-left">Price</th>
      <th className="p-2 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.map(product => (
      <tr key={product.id} className="border-b">
        <td className="p-2">{product.id}</td>
        <td className="p-2">{product.name}</td>
        <td className="p-2">₹{product.price}</td>
        <td className="p-2">
          <div className="flex space-x-2">
            <EditModal
              productId={product.id}
              initialName={product.name}
              initialImage={product.image}
              initialPrice={product.price}
              onProductUpdated={getProducts}
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={async () => {
                try {
                  const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
                    method: "DELETE",
                    credentials: "include",
                  });
                  if (response.ok) {
                    getProducts();
                  } else {
                    console.error("Error deleting product");
                  }
                } catch (error) {
                  console.error("Error deleting product:", error);
                }
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
    </div>

  );
};

export default ManageProducts;
