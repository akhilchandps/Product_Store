// src/components/AddModal.jsx
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';

const AddModal = ({onProductAdded}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        credentials: "include", // Send cookies with request
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, image, price }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Product added successfully!");
        setName("");
        setImage("");
        setPrice("");
        onProductAdded && onProductAdded();

      } else {
        const errorData = await response.json();
        setMessage("Error adding product: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error adding product.");
    }
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <button 
        type="button" 
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal">
        Add Product
      </button>

      {/* Modal */}
      <div 
        className="modal fade" 
        id="exampleModal" 
        tabIndex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Product</h1>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close">
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-control" 
                    placeholder="Enter product name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image URL</label>
                  <input 
                    type="text" 
                    id="image" 
                    className="form-control" 
                    placeholder="Enter image URL" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input 
                    type="number" 
                    id="price" 
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
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
