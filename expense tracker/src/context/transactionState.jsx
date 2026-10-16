import { useState } from "react";
import TransactionContext from "./transactionContext";
const TransactionState = (props) => {
  const host = "http://localhost:3000";
  const initialTransaction = [];
  const [transaction, setTransaction] = useState(initialTransaction);
  
  //Get all transactions
   const getTransaction = async() => {
     const response = await fetch(`${host}/api/transaction/fetchalltransactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" :  localStorage.getItem("token")
      },
    });
    const json = await response.json();
    setTransaction(json);

  }

  //Add a transaction
  const addTransaction = async(amount, item, type, category) => {
     const response = await fetch(`${host}/api/transaction/addtransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token" :localStorage.getItem("token")
      },
      body: JSON.stringify({amount,item,type,category}),
    });
    const json = await response.json()
    setTransaction(transaction.concat(json));
  };
  //Delete a transaction
  const deleteTransaction = async (id) => {
    const response = await fetch(`${host}/api/transaction/deletetransaction/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
    const newTransaction = transaction.filter((trans) => {
      return trans._id != id;
    });
    setTransaction(newTransaction);
  };

  //edit a transaction
  const editTransaction = async (id, amount, item, type, category) => {
    const response = await fetch(`${host}/api/transaction/updatetransaction/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("token")
      },
      body: JSON.stringify({amount,item,type,category}),
    });
    const json = await response.json();
   let newTransaction = JSON.parse(JSON.stringify(transaction));
    for (let i = 0; i < newTransaction.length; i++) {
      const element = newTransaction[i];
      if (element._id === id) {
        newTransaction[i].amount = amount;
        newTransaction[i].item = item;
        newTransaction[i].type = type;
        newTransaction[i].category = category;
        break;
      }
      
    }
    setTransaction(newTransaction);
  };
  return (
    <TransactionContext.Provider
      value={{
        transaction,
        addTransaction,
        deleteTransaction,
        editTransaction,getTransaction
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};
export default TransactionState;
