// src/Components/EditModal.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EditModal = ({ productId, initialName, initialImage, initialPrice, onProductUpdated }) => {
  // Local state is initialized with the product details passed via props.
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [price, setPrice] = useState(initialPrice);
  const [message, setMessage] = useState("");

  // Update local state if props change
  useEffect(() => {
    setName(initialName);
    setImage(initialImage);
    setPrice(initialPrice);
  }, [initialName, initialImage, initialPrice]);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, price }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Product updated successfully!");
        // Call the parent's callback to refresh the product list
        onProductUpdated && onProductUpdated();
      } else {
        const errorData = await response.json();
        setMessage("Error updating product: " + errorData.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Error updating product.");
    }
  };

  return (
    <div>
      {/* Button to trigger modal; using a unique modal ID for each product */}
      <button 
        type="button" 
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target={`#editModal-${productId}`}>
        Update
      </button>

      {/* Modal */}
      <div 
        className="modal fade" 
        id={`editModal-${productId}`} 
        tabIndex="-1" 
        aria-labelledby={`editModalLabel-${productId}`} 
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModalLabel-${productId}`}>Update Product</h1>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close">
              </button>
            </div>
            <form onSubmit={updateProduct}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor={`name-${productId}`} className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    id={`name-${productId}`}
                    className="form-control" 
                    placeholder="Enter product name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`image-${productId}`} className="form-label">Image URL</label>
                  <input 
                    type="text" 
                    id={`image-${productId}`}
                    className="form-control" 
                    placeholder="Enter image URL" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`price-${productId}`} className="form-label">Price</label>
                  <input 
                    type="number" 
                    id={`price-${productId}`}
                    className="form-control" 
                    placeholder="Enter price" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    step="0.01"
                  />
                </div>
                {message && <p className="text-success">{message}</p>}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
