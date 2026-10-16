import React, { useContext } from "react";
import transactionContext from "../context/transactionContext";
import { TrendingUp,TrendingDown,Wallet,ReceiptText} from "lucide-react";
import ThemeContext from "../context/themeContext";
const Dashboard = () => {
  const context = useContext(transactionContext);
  const context2 = useContext(ThemeContext);
  const { transaction } = context;
  const {mode} = context2;
  const totalIncome = transaction
    .filter((trans) => trans.type === "Income")
    .reduce((total, trans) => total + Number(trans.amount), 0);
 const totalExpenses = transaction
    .filter((trans) => trans.type === "Expense")
    .reduce((total, trans) => total + Number(trans.amount), 0);
 const totalBalance = totalIncome - totalExpenses;
  return (
    <div>
      <h1 className={`text-3xl text-center font-bold ${mode==="dark" ? "text-white" : "text-gray-800"}`}>Dashboard</h1>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

    {/*total income*/}
  <div className={`p-5 rounded-xl shadow-sm border transition duration-300 hover:shadow-md hover:-translate-y-1 ${
  mode === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
   <p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-500"}`}> Total Income
    </p>
    <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-green-600 mt-2">
      ₹{totalIncome.toLocaleString("en-IN")} 
    </h2>
    <div className="bg-green-100 p-3 rounded-xl">
    <TrendingUp size={24} className="text-green-600" />
  </div>
  </div>
  </div>
  {/*total expense*/}
<div className={`p-5 rounded-xl shadow-sm border transition duration-300 hover:shadow-md hover:-translate-y-1 ${
  mode === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
   <p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-500"}`}>
      Total Expenses </p>
    <div className="flex items-center justify-between">
  <h2 className="text-2xl font-bold text-red-600 mt-2">
    ₹{totalExpenses.toLocaleString("en-IN")}
  </h2>
   <div className="bg-red-100 p-3 rounded-xl">
    <TrendingDown size={24} className="text-red-600" />
  </div>
  </div>
</div>
{/*total balance*/}
<div className={`p-5 rounded-xl shadow-sm border transition duration-300 hover:shadow-md hover:-translate-y-1 ${
  mode === "dark"? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
  <p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-500"}`}>
   Total Balance </p>
  <div className="flex items-center justify-between">
  <h2 className="text-2xl font-bold text-blue-600 mt-2">
    ₹{totalBalance.toLocaleString("en-IN")}
  </h2>
  <div className="bg-blue-100 p-3 rounded-xl">
    <Wallet size={24} className="text-blue-600" />
  </div>
  </div>
</div>
{/*total transactions*/}
<div className={`p-5 rounded-xl shadow-sm border transition duration-300 hover:shadow-md hover:-translate-y-1 ${
  mode === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
  <p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-500"}`}>
   Total Transactions </p>
  <div className="flex items-center justify-between">
  <h2 className="text-2xl font-bold text-purple-600 mt-2">
    {transaction.length}
  </h2>
   <div className="bg-purple-100 p-3 rounded-xl">
    <ReceiptText size={24} className="text-purple-600" />
  </div>
  </div>
</div>
</div>
    </div>
  );
};

export default Dashboard;
