import React, { useContext}  from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import ThemeContext from '../context/themeContext';
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
 const context = useContext(ThemeContext);
 const {mode ,toggleMode} = context;
  const handleTheme=()=>{
    toggleMode();
  }
  return (
    <div>
        <div className={`w-full flex items-center justify-between px-4 h-14  shadow-md ${mode=== "dark"
             ? "bg-linear-to-r from-slate-950 via-slate-900 to-blue-950 text-white" : "bg-gray-200 text-gray-900"}`}>
          <div className="flex items-center gap-6">
          <h3 className={`text-xl font-bold tracking-tight ${mode === "dark" ? "text-white" : "text-gray-900"}`}> Expense
             <span className="ml-1 text-blue-400">Tracker</span></h3>
          <ul className="flex flex-row gap-6">
           <NavLink to="/" className={({ isActive }) =>`px-2 py-1 ${isActive ? "text-blue-500 font-bold ": mode==="dark"? "text-white":"text-gray-950"}`}>Home</NavLink>
           <NavLink to="/about" className={({ isActive }) =>`px-2 py-1 ${isActive ? "text-blue-500 font-bold": mode==="dark"? "text-white":"text-gray-950"}`}>About</NavLink> 
          </ul>
          </div>
         
<div className="flex ml-auto items-center gap-3">
  {!localStorage.getItem("token") ? (
    <div className="flex gap-3">
      <NavLink className="bg-blue-500 px-3 py-1 rounded-lg text-white" to="/login">
        Login
      </NavLink>
      <NavLink className="bg-blue-500 px-3 py-1 rounded-lg text-white mr-3" to="/signup">
        Signup
      </NavLink>
    </div>
  ) : (
    <button className="bg-blue-500 px-3 py-1 rounded-lg mr-3 text-white" onClick={handleLogout}>
      Logout
    </button>
  )}
</div> 
<div className="search flex items-center bg-white border border-green-400 px-2 py-1 rounded-lg gap-1">
    <button className="text-green-400">Search</button>
    <span className="h-5 border-l border-green-400"></span>
    <span className="material-symbols-outlined text-green-400 hover:cursor-pointer hover:bg-gray-200">
      search
    </span>
  </div>
      <button className="bg-blue-500 px-3 py-1 rounded-lg mx-2 text-white" onClick={handleTheme}>{mode === "dark" ? "Light Mode" : "Dark Mode"}
</button>
          </div>
        </div>
  )
}

export default Navbar