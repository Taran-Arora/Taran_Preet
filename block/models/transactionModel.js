const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    senderAccountAddress: {
        type:String,
        required: true,
    },

    receiverAccountAddress: {
        type:String,
    },

    amount: {
        type:String,
        required: true,
    },

    hash: {
        type:String,
        required: true,
    },
    
    tokenName: {
        type:String,
        required: true,
    },   
      
    trxID: {
        type:String,
        required: true,
    },  
}, 
{
    timestamps:true
});
const chainTransaction = mongoose.model('Transaction', transactionSchema);
module.exports = chainTransaction;