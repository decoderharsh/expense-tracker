import mongoose from 'mongoose';
const { Schema } = mongoose;
const transactionSchema = new Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
    amount : {
        type : Number,
        required : true,
    },
    item : {
        type : String,
    },
    type:{
        type : String,
        required : true
    },
    category:{
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
});
const Transaction = mongoose.model('Transaction',transactionSchema);
export default Transaction;
