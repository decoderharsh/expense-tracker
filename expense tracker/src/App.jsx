
import React, { useState ,useContext } from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TransactionState from "./context/transactionState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ThemeContext from './context/themeContext';
function App() {
   const context = useContext(ThemeContext);
 const {mode ,toggleMode} = context;
 const [alert,setAlert]=useState(null);
 const showAlert = (message,type)=>{
  setAlert({
    message:message,
    type:type
  })
  setTimeout(()=>{
setAlert(null)
  },1500)
 }

  return (
    <div className={`min-h-screen ${mode === "dark"  ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      }`}>
  <TransactionState>
  <BrowserRouter>
   <Navbar/>
   <div className="min-h-12">
  {alert && <Alert message={alert.message} type={alert.type} />}
  </div>
  <Routes>
      <Route path="/" element={<Home showAlert={showAlert}/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/login" element={<Login showAlert={showAlert}/>} />
         <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
    </Routes>
  </BrowserRouter>
  </TransactionState>
    </div>
  )
}

export default App
