import React, { useState } from 'react';

const OrderProduct = ({ productId, productName, productPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json(); 
      console.log("Order Response:", data);

      if (response.ok) { 
        setMessage("Order placed successfully!");
        setMessageType("success");
      } else {
        setMessage("User should log in before placing an order.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Error placing order.");
    }
  };

  return (
    <div>
     <div className="p-4 border rounded shadow my-4">

<h2 className="text-xl font-bold mb-2">{productName}</h2>
<p className="mb-2">Price: ₹{productPrice}</p>
<form onSubmit={handleOrder}>
  <label className="block mb-2">
    Quantity:
    <input
      type="number"
      value={quantity}
      min="1"
      onChange={(e) => setQuantity(e.target.value)}
      className="ml-2 p-1 border rounded"
      required
    />
  </label>
  <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
    Place Order
  </button>
</form>
{message && (
        <p className={`mt-2 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
</div>
    </div>

  );
};

export default OrderProduct;
