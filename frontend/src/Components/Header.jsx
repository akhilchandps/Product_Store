import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedToken = localStorage.getItem("usertoken");
    console.log(storedToken);
    
    setToken(storedToken || ""); // Set token if exists, otherwise empty
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    setToken(""); // Clear token state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <nav className="navbar bg-[#283747] p-3">
        <div className="container-fluid flex justify-between">
          <Link className="text-white text-3xl font-bold no-underline" to="/">
            ProductStore
          </Link>
          {token ? (
            <button onClick={handleLogout} className="text-black px-3 py-1 bg-rose-600 text-white rounded-md">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-black px-3 py-1 ">
              <button className="bg-green-500 text-white px-2 py-1 rounded-md">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
