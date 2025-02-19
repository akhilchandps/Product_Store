// src/pages/Users.jsx
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);


  const getAlluser = async()=>{

    const response = await fetch("http://localhost:5000/api/auth/users",{
      method:"GET",
      credentials:"include"
    })
    console.log(response);
    const data = await response.json();
    console.log(data);
    setUsers(data.users)
    
    
  }
useEffect(()=>{
  getAlluser();
},[])
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <table className="w-full table-auto bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          )):(
            <tr>
              <td colSpan="5" className="text-center p-4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
