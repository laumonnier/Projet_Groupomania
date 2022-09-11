const express = require('express');
const router = express.Router();
const authController = require ('../controllers/auth.controllers');
// Importing the password middleware
// const password = require ('../middleware/password');

// Additions of the various endpoints
router.post('/signup', authController.signUp);
// router.post('/login', userController.login);

module.exports = router;