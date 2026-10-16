import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import Transaction from "../models/Transaction.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

//ROUTE 1 - Get all the transactions using : GET "/api/getuser".Login required
router.get("/fetchalltransactions",fetchUser, async(req,res)=>{
    try {
      const transactions = await Transaction.find({userId:req.user.id})
      res.json(transactions);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }

})
//ROUTE 2 - Add transactions using : POST "/api/addtransaction".Login required
router.post(
  "/addtransaction",fetchUser,
  [
    body("amount", "The minimum amount must be at least rupees 20").isNumeric({ min: 20}),
    body("item", "Enter a valid item").isLength({min:2}),
    body("category", "Enter a valid category").isLength({min: 3}),
  ],
  async (req, res) => {
    try {
       const {amount,item,type,category}=req.body;
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //adding a new transaction
    const transaction = new Transaction({
    amount ,item ,type , category ,userId:req.user.id
    })  
    const savedTransaction = await transaction.save();
    res.json(savedTransaction)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
    })
    //ROUTE 3 - Upadate an existing transaction using : PUT "/api/updatetrans".Login required
     router.put("/updatetransaction/:id",fetchUser,async (req, res) => {
        const {amount,item,type,category}=req.body;
        //create a new tansaction object
        try {
          const newTransaction = {};
        if(amount){newTransaction.amount=amount};
         if(item){newTransaction.item=item};
          if(type){newTransaction.type=type};
           if(category){newTransaction.category=category}
           
           //find the transaction to be updated and update it
           let transaction = await Transaction.findById(req.params.id);
           if(!transaction){
            return res.status(404).send("transaction not found!");
           }
          if(transaction.userId!=req.user.id){
             return res.status(404).send("Not Allowed");
          }
          transaction = await Transaction.findByIdAndUpdate(req.params.id,{$set:newTransaction},{new:true});
          res.json({transaction});
        } catch (error) {
           console.error(error.message);
           res.status(500).send("Internal server error");
        }
        
     }  
)
//ROUTE 4 - Delete an existing transaction using : DELETE "/api/updatetrans".Login required
 router.delete("/deletetransaction/:id",fetchUser,async (req, res) => {
           try {
            //find the transaction to be delete and delete it
           let transaction = await Transaction.findById(req.params.id);
           if(!transaction){
            return res.status(404).send("transaction not found!");
           }
           //allow deletion only if user to belongs to this transaction
          if(transaction.userId!=req.user.id){
             return res.status(404).send("Not Allowed");
          }
          transaction = await Transaction.findByIdAndDelete(req.params.id);
          res.json({"Success":"This transaction has been deleted"});
           } catch (error) {
             console.error(error.message);
           res.status(500).send("Internal server error");
           }
           
     }  
)
export default router;