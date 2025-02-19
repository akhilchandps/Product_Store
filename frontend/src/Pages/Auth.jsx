import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from "../images/rain.png"
const Auth = ({ register }) => {

const navigate = useNavigate();
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleRegister=async(e)=>{
    e.preventDefault();
    const datas={
       name,
       email,
       password,
        
    }
    console.log(datas);
    
    const response = await fetch("http://localhost:5000/api/auth/register",{
       

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(datas)

    })
    console.log(response);

    const data = await response.json()
    console.log(data);

    if(response.ok){
        alert(data.message)
        navigate('/login')
    }else{
        alert(data.message)

    }
    
    
}

const handlelogin= async(e)=>{
    e.preventDefault();
    const datas={
        email,
        password,  
     }
    const response = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(datas)
    })
    console.log(response);
    const data = await response.json();
    console.log(data);
    if(response.ok){
        alert(data.message);
        if (data.user.role === "Admin") {
          navigate('/dashboard');
        } else {
          const token=data.token
          localStorage.setItem("usertoken",token)
          navigate('/');
        }

    }else{
        alert(data.message);

    }
    
    

}



  return (
    <div className="flex justify-center mt-24" style={{background:`url(${img})`,backgroundRepeat:"no-repeat",width:"100%",backgroundPosition:"right"}}>
      <form className="w-96 bg-gradient-to-r from-indigo-500 to-blue-500 p-8 mt-24 rounded flex flex-col gap-3 shadow-md">
        <h1 className="text-3xl font-bold text-white">
          {register ? "Register" : "Login"}
        </h1>

        {register && (
          <>
            <label htmlFor="username" className="text-white">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 rounded-sm  border-1 border-orange-300 outline-none" onChange={(e)=>setName(e.target.value)}
            />
          </>
        )}

        <label htmlFor="email" className="text-white">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded-sm  border-1 border-orange-300 outline-none" onChange={(e)=>setEmail(e.target.value)}
        />

        <label htmlFor="password" className="text-white">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded-sm  border-1 border-orange-300 outline-none" onChange={(e)=>setPassword(e.target.value)}
        />
        {
        register?
        <div className='flex justify-between'>
        <p className='text-white'>Already Have an Account </p>
        <Link className='text-white' to='/login'>login Here</Link>
        </div>:
           <div className='flex justify-between'>
           <p className='text-white'>Dont have an Account </p>
           <Link to='/register' className='text-white'>Register Here</Link>
           </div>

        }
        


   
         {
            register ?
            <button className="mt-4 bg-white text-slate-600 p-2 rounded-md hover:bg-blue-600" onClick={handleRegister} >
            Register
            </button>:
              <button className="mt-4  bg-white  text-slate-600 p-2 rounded-md hover:bg-blue-600" onClick={handlelogin} >
          Login
              </button>
         }
           
      
      </form>
    </div>
  );
};

export default Auth;
