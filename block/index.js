const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authicationRouter = require('./routes/authicationRoutes');
require('dotenv').config();

const app = express();
const port = process.env.Port || 3000;
const database = process.env.DataBase;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(database, {
}).then(() => {
  console.log('database is connected');
});

// Routes
app.use('/api', authicationRouter);

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/Register.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/form.html'));
});
app.get('/swap', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/swap.html'));
});
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/test.html'));
});
app.get('/testswap', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/testswap.html'));
});
app.get('/trnswap', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/trnswap.html'));
});
app.get('/stake', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/stake.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// const data = {
//   token,
//   senderAccount,
//   receiverAccount,
//   amount,
//   hash: receipt.transactionHash
// };
// $.ajax({
//   url: '/api/home',
//   type: 'POST',
//   contentType: 'application/json',
//   data: JSON.stringify(data),
//   success: function (response) {
//     console.log('Transaction data sent to backend:', response);
//   },
//   error: function (error) {
//     console.error('Error sending transaction data to backend:', error);
//   }
// });


// CREATE USER 'example_user'@'%' IDENTIFIED BY 'tp9014361@gmail.com';
