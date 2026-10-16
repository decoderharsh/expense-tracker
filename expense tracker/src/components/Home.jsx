import React, { useContext }  from 'react'
import Transaction from './Transaction';
import Dashboard from './Dashboard';
import ThemeContext from '../context/themeContext';

const Home = (props) => {
  const context= useContext(ThemeContext);
  const {mode} = context;
 const {showAlert}=props;
  return (
    <div className={`container mx-auto px-4 py-4 ${mode === "dark" ? "text-white": "text-gray-950"
      }`}>
       <Dashboard/>
       <Transaction showAlert={showAlert}/>
    </div>
  )
}

export default Home