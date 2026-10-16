import React, { useContext, useEffect, useState } from "react";
import transactionContext from "../context/transactionContext";
import Transactionitem from "./Transactionitem";
import AddTransaction from "./AddTransaction";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/themeContext";
const Transaction = (props) => {
  const context = useContext(transactionContext);
  const themeContext = useContext(ThemeContext);
   const { mode } = themeContext;
  let navigate = useNavigate();
  const { transaction,getTransaction,editTransaction} = context;
  useEffect(()=>{
    if(localStorage.getItem("token")){
       getTransaction();
    }else{
      navigate("/login");
    }
   
  },[]);
  
   const [transactions,setTransaction] = useState({id: "",eamount:"",eitem:"",etype:"",ecategory:""});
  const saveTrans= (e)=>{
    e.preventDefault();
   editTransaction(transactions.id, transactions.eamount, transactions.eitem, transactions.etype, transactions.ecategory);
    setShowModal(false);
     props.showAlert("Updated successfully!" ,"success");
  }
  const onChange=(e)=>{
    setTransaction({...transactions,[e.target.name] : e.target.value})
  }
  const [showModal, setShowModal] = useState(false);
  const updateTransaction=(currentTrans)=>{
   setShowModal(true);
   setTransaction( 
    {
      id: currentTrans._id,
      eamount: currentTrans.amount,
    eitem: currentTrans.item,
    etype: currentTrans.type,
    ecategory: currentTrans.category});
  }
  
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,2fr)_minmax(0,3fr)] gap-6 items-start px-4 my-6">
     <div className="w-full min-w-0">
    <AddTransaction showAlert={props.showAlert} />
  </div>
   {showModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
  <div className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:p-8 ${
       mode === "dark" ? "bg-gray-900 border-gray-800 text-white": "bg-white border-gray-100 text-gray-900"}`}>

    <h2 className="mb-4 text-xl font-bold">
      Edit Transaction
    </h2>
     {/* Amount */}
    <div className="mb-3">
      <label htmlFor="amount" className={`block text-sm font-medium ${mode==="dark" ? "text-gray-200" : "text-gray-700"} mb-2`}>
        Amount (₹)
      </label>
      <input type="number" placeholder="Enter amount" id="eamount" name="eamount" value={transactions.eamount}
        className={`w-full border border-gray-300 rounded-lg px-4 py-3 ${mode === "dark" ? "bg-gray-900 text-white border-gray-600 placeholder:text-gray-400"
    : "bg-white text-gray-800 border-gray-300"}  outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
        onChange={onChange} min="0" required/>
    </div>

    {/* Item */}
    <div className="mb-3">
      <label htmlFor="item" className={`block text-sm font-medium ${mode==="dark" ? "text-gray-200" : "text-gray-700"} mb-2`}>
        Transaction Name
      </label>
      <input type="text" placeholder="e.g. Grocery shopping" id="eitem" name="eitem" value={transactions.eitem} className={`w-full border border-gray-300 rounded-lg px-4 py-3 ${mode === "dark" ? "bg-gray-900 text-white border-gray-600 placeholder:text-gray-400"
    : "bg-white text-gray-800 border-gray-300"} outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
        onChange={onChange} minLength={3} required/>
    </div>

    {/* Type */}
    <div className="mb-3">
      <label htmlFor="type" className={`block text-sm font-medium ${mode==="dark" ? "text-gray-200" : "text-gray-700"} mb-2`}>
        Transaction Type
      </label>
      <select id="etype" name="etype" value={transactions.etype} onChange={onChange} className={`w-full border border-gray-300 rounded-lg px-4 py-3 ${mode==="dark" ? "bg-gray-900 text-white border-gray-600" : "text-gray-800 bg-white"} text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
        required>
        <option value="">Select transaction type</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
    </div>

    {/* Category */}
    <div className="mb-4">
      <label htmlFor="category" className={`block text-sm font-medium ${mode==="dark" ? "text-gray-200" : "text-gray-700"} mb-2`}>
        Category
      </label>
       <select id="ecategory" name="ecategory" value={transactions.ecategory} onChange={onChange} className={`w-full border border-gray-300 rounded-lg px-4 py-3 ${mode==="dark" ? "text-white bg-gray-900 border-gray-600" : "text-gray-800 bg-white"} outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
    required>
    <option value="">Select category</option>
     {transactions.etype === "Income" && (
      <>
        <option value="Salary">Salary</option>
        <option value="Freelancing">Freelancing</option>
        <option value="Business">Business</option>
        <option value="YouTube">YouTube</option>
      </>
    )}

    {transactions.etype === "Expense" && (
      <>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Movies">Movies</option>
        <option value="Workout">Workout</option>
        <option value="Others">Others</option>
      </>
    )}
  </select>
    </div>

    <div className="mt-6 flex justify-end gap-3">
      <button className="rounded-md bg-gray-500 px-4 py-2 text-white" onClick={() => setShowModal(false)}>
        Close
      </button>

       <button disabled={transactions.eitem.trim().length<3 || transactions.etype.trim().length<5 || transactions.ecategory.trim().length<3 || transactions.eamount===""} className="bg-blue-500 px-1.5 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer text-white disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={saveTrans}>Update</button>
    </div>

  </div>
</div>
}
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-xl capitalize my-4">your transactions</h1>
      {transaction.length===0 && 'No transactions to display'}
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-4 w-full">
        {transaction.map((trans) => (
          <Transactionitem key={trans._id} trans={trans} updateTransaction={updateTransaction}  showAlert={props.showAlert}/>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default Transaction;
