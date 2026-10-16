import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials,setcredentials]=useState({email:"",password:""});
  let navigate = useNavigate();
  const loggedIn = async (e)=>{
     e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login",{
       method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password}),
     });
      const json = await response.json();
      if(json.success){
        //save the authtoken and redirect
        localStorage.setItem('token',json.authToken);
        navigate("/");
         props.showAlert("Logged In Successfully!","success");

      }else{
        props.showAlert("inavlid credentials","error");
      }
  }
    const onChange=(e)=>{
   setcredentials({...credentials,[e.target.name] : e.target.value});
     
  }
  return (
    <div className="flex justify-center items-center my-20">
      <div className="flex flex-col gap-4 justify-center items-center w-80 border border-gray-300 rounded-xl p-6 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-center">Welcome Back!</h2>
          <p className="text-gray-500">Login to your Expense Tracker</p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h2>Email</h2>
          <input type="email" placeholder="Enter your email" name="email" value={credentials.email} onChange={onChange} className="border  border-gray-300 rounded-lg px-2 w-full py-2"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h2>Password</h2>
          <input type="password" placeholder="Enter your password" name="password" value={credentials.password} onChange={onChange}
            className="border  border-gray-300 rounded-lg px-2 w-full py-2"
          />
        </div>
        <button className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:cursor-pointer hover:bg-blue-600 transition duration-300" onClick={loggedIn}>
          Login
        </button>
        <p>Don't have an account? Sign up</p>
      </div>
    </div>
  );
};

export default Login;
