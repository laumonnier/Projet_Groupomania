// Dependency used and tools of library
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const registerUser = require ('../controllers/user.register');
const userControl = require ('../controllers/user.control');
const userLog = require ('../controllers/user.log');
// Importing the password middleware
const password = require ('../middleware/password');

// Additions of the various endpoints
router.post('/signup', password, registerUser.signUp);
router.post('/login', userLog.login);
router.get('/logout', userLog.logout);

// Get all users
router.get('/', auth, userControl.getAllUsers);
router.get('/:id', auth, userControl.getOneUser);
router.put('/:id', auth, userControl.updateUser);
router.delete('/:id', auth, userControl.deleteUser);
// router.patch('/follow/:id', userControl.followUser);
// router.patch('/unfollow/:id', userControl.unfollowUser);

module.exports = router;