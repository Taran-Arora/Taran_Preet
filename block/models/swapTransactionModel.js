const mongoose = require('mongoose');

const swapTransactionSchema = new mongoose.Schema({

    AccountAddress: {
        type: String,
        required: true
    },

    amountIn: {
        type: Number,
        required: true
    },

    amountOut: {
        type: Number,   
        required: true
    },

    path: {
        type: Array,
        required: true,
    },

    to: {
        type: String,
        required: true,
    },

    deadline: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
    });

const swapTransaction = mongoose.model('swap', swapTransactionSchema);
module.exports = swapTransaction;