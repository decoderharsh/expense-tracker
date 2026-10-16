import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const [credentials, setcredentials] = useState({name: "",email: "",password: "",cpassword: ""});
  let navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
  alert("Passwords do not match");
  return;
}
    const response = await fetch("http://localhost:3000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        cpassword: credentials.cpassword,
      }),
    });
    const json = await response.json();
    console.log(json);
  if(json.success){
   //save the authtoken and redirect
    localStorage.setItem("token", json.authToken);
    navigate("/login");
    props.showAlert("Account Created Successfully","success");
  }else{
   props.showAlert("invalid credentials","error");
  }
   
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center my-8 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-300 p-6 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-center">Create Account</h2>
          <p className="text-gray-500 text-center">Start managing your money today.</p>
        </div>
         <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1 w-full">
          <h2>Full Name</h2>
          <input type="text" placeholder="Enter your full name" name="name" value={credentials.name} onChange={onChange} className="border  border-gray-300 rounded-lg px-2 w-full py-2" minLength={5} required/>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h2>Email Address</h2>
          <input type="email" placeholder="Enter your email address" name="email" value={credentials.email}
            onChange={onChange} className="border  border-gray-300 rounded-lg px-2 w-full py-2"/>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h2>Password</h2>
          <input type="password" placeholder="set your password" name="password" value={credentials.password}
            onChange={onChange}  className="border  border-gray-300 rounded-lg px-2 w-full py-2" minLength={8} required/>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h2>Confirm Password</h2>
          <input type="password" placeholder="Confirm your password" name="cpassword" value={credentials.cpassword}
            onChange={onChange} className="border border-gray-300 rounded-lg px-2 w-full py-2" minLength={8} required/>
        </div>
        <button type="submit" className="w-full gap-1 bg-green-500 text-white font-medium py-2 rounded-lg hover:cursor-pointer hover:bg-green-600 transition duration-300"> Create Account
        </button>
        </form>
        <p className="text-center">Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Signup;
