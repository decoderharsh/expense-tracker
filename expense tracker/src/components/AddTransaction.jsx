import React,{useContext, useState} from 'react'
import transactionContext from "../context/transactionContext";
import ThemeContext from '../context/themeContext';
const AddTransaction = (props) => {
  const context = useContext(transactionContext);
  const {addTransaction} = context;
  const themeContext = useContext(ThemeContext);
const { mode } = themeContext;
  const [transaction,setTransaction] = useState({amount:"",item:"",type:"",category:""})
  const saveTrans=(e)=>{
    e.preventDefault();
     addTransaction(transaction.amount,transaction.item,transaction.type,transaction.category);
     setTransaction({amount:"",item:"",type:"",category:""});
     props.showAlert("transaction added successfully!","success");
  }
  const onChange=(e)=>{
    setTransaction({...transaction,[e.target.name] : e.target.value,...(e.target.name==="type" && {category:""})});
     
  }
  return (
  <div>
<div className="w-full max-w-md mx-auto my-10 px-3">
  <div className={`rounded-2xl shadow-lg border p-5 sm:p-8 ${
  mode === "dark" ? "bg-gray-950 border-gray-600" : "bg-white border-gray-100"}`}>

    {/* Heading */}
    <div className="mb-4">
      <h1 className={`text-2xl font-bold ${ mode === "dark" ? "text-white" : "text-gray-800"}`}>
        Add Transaction
      </h1>
      <p className={`text-sm mt-1 ${mode === "dark" ? "text-gray-300" : "text-gray-500"}`}>
        Enter the details of your transaction
      </p>
    </div>

    {/* Amount */}
    <div className="mb-3">
      <label htmlFor="amount" className={`block text-sm font-medium mb-2 ${mode === "dark" ? "text-gray-200" : "text-gray-700"}`}>
        Amount (₹)
      </label>
      <input type="number" placeholder="Enter amount" id="amount" name="amount" value={transaction.amount}
       className={`w-full border rounded-lg px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
        ${mode === "dark" ? "bg-gray-950 text-white border-gray-600 placeholder:text-gray-400"
    : "bg-white text-gray-800 border-gray-300"}`}
        onChange={onChange} min="0" required/>
    </div>

    {/* Item */}
    <div className="mb-3">
      <label htmlFor="item" className={`block text-sm font-medium mb-2 ${mode === "dark" ? "text-gray-200" : "text-gray-700"}`}>
        Transaction Name
      </label>
      <input type="text" placeholder="e.g. Grocery shopping" id="item" name="item" value={transaction.item} className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100  ${mode === "dark" ? "bg-gray-950 text-white border-gray-600 placeholder:text-gray-400"
    : "bg-white text-gray-800 border-gray-300"}`}
        onChange={onChange} minLength={3} required/>
    </div>

    {/* Type */}
    <div className="mb-3">
      <label htmlFor="type" className={`block text-sm font-medium mb-2 ${mode === "dark" ? "text-gray-200" : "text-gray-700"}`}>
        Transaction Type
      </label>
      <select id="type" name="type" value={transaction.type} onChange={onChange} className={`w-full border rounded-lg px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
  mode === "dark" ? "bg-gray-950 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
}`} required>
        <option value="">Select transaction type</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
    </div>

    {/* Category */}
    <div className="mb-4">
      <label htmlFor="category" className={`block text-sm font-medium mb-2 ${mode === "dark" ? "text-gray-200" : "text-gray-700"}`}>
        Category
      </label>
       <select id="category" name="category" value={transaction.category} onChange={onChange} className={`w-full border rounded-lg px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
  mode === "dark" ? "bg-gray-950 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
}`} required>
    <option value="">Select category</option>
     {transaction.type === "Income" && (
      <>
        <option value="Salary">Salary</option>
        <option value="Freelancing">Freelancing</option>
        <option value="Business">Business</option>
        <option value="YouTube">YouTube</option>
      </>
    )}

    {transaction.type === "Expense" && (
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

    {/* Save Button */}
    <button
      disabled={
        transaction.item.trim().length < 3 ||
        transaction.type.trim().length < 5 ||
        transaction.category.trim().length < 3 ||
        transaction.amount === ""
      }
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      onClick={saveTrans}
    >
      + Add Transaction
    </button>

  </div>
</div>
</div>
  )
}

export default AddTransaction 