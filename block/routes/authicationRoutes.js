const express = require('express');
const router = express.Router();
const authicationController = require('../controllers/authicationController');

router.post('/login', authicationController.login);
router.post('/register', authicationController.register);
router.post('/home', authicationController.transaction);
router.post('/swap', authicationController.swap);

module.exports = router;
