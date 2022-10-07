// Dependency used and tools of library
const express = require('express');
const router = express.Router();
// const { userAuth } = require('../middleware/auth'); // Provides "basic" user access rights
// const { adminAuth } = require('../middleware/auth');// Provides "admin" user access rights
const registerUser = require ('../controllers/user.register');
const uploadControl = require ('../controllers/upload');
const userControl = require ('../controllers/user.control');
const userLog = require ('../controllers/user.log');
const multer = require('multer');
const upload = multer();
// Importing the password middleware
const password = require ('../middleware/password');

// Additions of the various endpoints
router.post('/signup', password, registerUser.signUp);
router.post('/login', userLog.login);
router.get('/logout', userLog.logout); // userAuth

// Additions of the various parameters concerning the routes of the user in the site
router.get('/', userControl.getAllUsers); // adminAuth
router.get('/:id', userControl.getOneUser); // adminAuth
router.put('/:id',  userControl.updateUser); // userAuth
router.put('/:id', userControl.updateRole); // adminAuth
router.delete('/:id', userControl.deleteUser); // adminAuth
// router.patch('/follow/:id', userControl.followUser);
// router.patch('/unfollow/:id', userControl.unfollowUser);
// router.post('/:id/like', auth, userControl.createLikeStatus);

// Additions of different parameters for image download routes
router.post('/upload', upload.single('file'), uploadControl.uploadUserProfil);

module.exports = router;