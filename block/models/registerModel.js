const mongoose = require('mongoose');

const register = new mongoose.Schema({

    username: {
        type:String,
        required: true,
    },

    sponsor_id: {
        type:String,
    },

    first_name: {
        type:String,
        required: true,
    },

    last_name: {
        type:String,
        required: true,
    },
    
    wallet_address: {
        type:String,
        required: true,
    },   
}, 
{
    timestamps:true
});
const userRegister = mongoose.model('User', register);
module.exports = userRegister;