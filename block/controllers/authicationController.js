const { generateUsename } = require('../helpers/generateusername');
const registerModel = require('../models/registerModel');
const chainTransactionModel = require('../models/transactionModel');
const swapTransaction = require('../models/swapTransactionModel');
const Web3 = require('web3');
// const Tx = require('ethereumjs-tx').Transaction;
require('dotenv').config();


const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

const abi = [
    // Add the ERC-20 ABI here
    // A typical ABI for an ERC-20 token contains the `transfer` 
];

exports.login = async (req, res) => {
    const { address } = req.body;
    let checkExistAddress = 0;

    if (!address) {
        return res.status(400).json({ error: 'Ethereum address is required' });
    }
    if (address) {
        checkExistAddress = await registerModel.countDocuments({ wallet_address: address });
        if (checkExistAddress) {
            return res.json({
                status: 'success',
                message: 'Login successfull',
                address: address
            });
        }
        else {
            return res.status(400).json({ message: 'User not Register' });
        }
    }
    // else {
    //     return res.status(400).json({ error: 'Invalid request' });
    // }

    // Implement your login logic here
    // For example, check if the address is registered in your database

};


exports.register = async (req, res) => {
    const { sponserId, address, firstName, lastName } = req.body;
    let checkExistSponsor = 0;
    const username = await generateUsename();
    // Add validation and any additional processing here
    if (!address || !firstName || !lastName) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (sponserId) {
        checkExistSponsor = await registerModel.countDocuments({ username: sponserId });
    }
    const checkExistAddress = await registerModel.countDocuments({ wallet_address: address });

    if (checkExistAddress) {
        return res.status(400).json({ error: 'Wallet Address already existed' });
    }

    if (checkExistSponsor != 0) {

        const userData = {
            username: username,
            sponsor_id: sponserId,
            first_name: firstName,
            last_name: lastName,
            wallet_address: address,
        }

        if (userData) {
            await registerModel.create(userData);
            res.status(200).json({
                status: 'success',
                message: 'Register successfully!'
            });
        }
    }
    else {
        return res.status(400).json({ error: 'Sponsor ID not found' });
    }

    // Simulate database operation
    res.status(200).json({ message: 'Registration successful!' });
    console.log('User Registered:', { sponserId, address, firstName, lastName });

    // Send success response
};



// exports.transaction = async (req, res) => {
//     const { token, account, amount, senderaddress } = req.body;

//     // Validate the received data
//     if (!token || !account || !amount || !senderaddress) {
//         return res.status(400).send('All fields are required');
//     }

//     try {
//         // Setup contract
//         const contractAddress = token; // Assuming token contains the contract address of the token
//         const contract = new web3.eth.Contract(abi, contractAddress);

//         // Convert amount to the correct unit (assuming the token has 18 decimals)
//         const decimals = 18;
//         const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

//         // Get the nonce
//         const nonce = await web3.eth.getTransactionCount(senderaddress, 'latest');

//         // Build the transaction
//         const tx = {
//             from: senderaddress,
//             to: contractAddress,
//             gas: 2000000,
//             nonce: nonce,
//             data: contract.methods.transfer(account, amountInWei).encodeABI()
//         };

//         // Sign the transaction
//         const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');
//         const transaction = new Tx(tx, { chain: 'mainnet' });
//         transaction.sign(privateKey);

//         // Send the transaction
//         const serializedTransaction = transaction.serialize().toString('hex');
//         const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTransaction);

//         // Respond with success
//         res.status(200).send(`Transaction successful with hash: ${receipt.transactionHash}`);
//     } catch (error) {
//         console.error('Error sending transaction:', error);
//         res.status(500).send('An error occurred while sending the transaction');
//     }
// };


exports.transaction = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const { senderAddress, receiverAccount, amount, hash, token } = req.body;
        console.log('req', req.body);
        const transaction = {
            senderAccountAddress: senderAddress,
            receiverAccountAddress: receiverAccount,
            amount: amount,
            hash: hash,
            tokenName: token,
            trxID: hash,
        };
        console.log('transaction', transaction);

        if (transaction) {
            await chainTransactionModel.create(transaction);
            res.status(200).json({
                status: 'success',
                message: 'Transaction happen successfully!'
            });
        }
        else {
            res.status(400).json({
                status: 'fail',
                message: 'Transaction not happen!'
            });
        }
    } catch (error) {
        console.error('Error saving transaction data:', error);
        res.status(500).send('Error saving transaction data');
    }
};

// let userBalances = {
//     '0xUserAddress1': {
//         bnb: 10, // BNB balance
//         usdt: 500 // USDT balance (mocked, should match the actual contract)
//     },
//     '0x56e58f0d3294b1cdb2bf5d448638bd595a820a85': {  // Example address for testing
//         bnb: 10, // BNB balance
//         usdt: 500 // USDT balance
//     }
// };

// let exchangeRate = 566.2470723357129; // Example exchange rate

// async function fetchExchangeRate() {
//     try {
//         const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,tether&vs_currencies=usd');
//         const data = await response.json();
//         const bnbToUsd = data.binancecoin.usd;
//         const usdtToUsd = data.tether.usd;
//         exchangeRate = bnbToUsd / usdtToUsd;
//         console.log(`Exchange rate updated: 1 BNB = ${exchangeRate} USDT`);
//     } catch (error) {
//         console.error('Error fetching exchange rate:', error);
//     }
// }

// // Initial fetch and set interval for fetching exchange rate
// fetchExchangeRate();
// setInterval(fetchExchangeRate, 60000); // Update every minuteexchange-rate

// exports.exchange_rate = async (req, res) => {
//     res.json({ exchangeRate });
// };

// exports.swap = async (req, res) => {
//     const { bnbAmount, address } = req.body;
//     const normalizedAddress = address.toLowerCase(); // Normalize address to lowercase

//     if (userBalances[normalizedAddress]) {
//         if (userBalances[normalizedAddress].bnb >= bnbAmount) {
//             userBalances[normalizedAddress].bnb -= bnbAmount; // Deduct BNB
//             userBalances[normalizedAddress].usdt += bnbAmount * exchangeRate; // Convert BNB to USDT based on exchange rate
//             res.json({ success: true });
//         } else {
//             res.json({ success: false, message: 'Insufficient BNB balance' });
//         }
//     } else {
//         res.json({ success: false, message: 'User not found' });
//     }
// };




exports.swap = async (req, res) => {

    const { useraccount, amountIn, amountOut, path, to, deadline } = req.body;

    if(!useraccount, !amountIn, !amountOut, !path, !to, !deadline) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const data = {
        AccountAddress: useraccount,
        amountIn: amountIn,
        amountOut: amountOut,
        path: path,
        to: to,
        deadline: deadline,
    }

    if (data) {
        await swapTransaction.create(data);
        res.json({
            'status': 'success',
            data: data
        });
    }
    else {
        res.status(400).json({
            status: 'fail',
            message: 'Swap Transaction not happen!'
        });
    }
}