const express = require('express');
const AuthController = require('../controllers/authController')
const router = express.Router(); // router object will allow us to create some routes

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
//todo route is only accesible if token is valid
module.exports = router;