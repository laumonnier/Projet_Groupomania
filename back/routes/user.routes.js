// Dependency used and tools of library
const express = require('express');
const router = express.Router();
// const { auth } = require('../middleware/auth');
// const { userAuth } = require('../middleware/auth'); // Provides "basic" user access rights
// const { adminAuth } = require('../middleware/auth');// Provides "admin" user access rights
const registerUser = require ('../controllers/auth.controller');
const uploadController = require ('../controllers/upload.controller');
const userController = require ('../controllers/user.controller');
const multer = require('multer');
const upload = multer();
// Importing the password middleware
const password = require ('../middleware/password');

// Additions of the various endpoints
router.post('/signup', password, registerUser.signUp);
router.post('/login', registerUser.login);
router.get('/logOut', registerUser.logOut); // userAuth

// Additions of the various parameters concerning the routes of the user in the site
router.get('/', userController.getAllUsers); // adminAuth
router.get('/:id', userController.getOneUser); // adminAuth
router.put('/:id', userController.updateUser); // userAuth
router.put('/:id', userController.updateRole); // adminAuth
router.delete('/:id', userController.deleteUser); // adminAuth
// router.patch('/follow/:id', userControl.followUser);
// router.patch('/unfollow/:id', userControl.unfollowUser);
// router.post('/:id/like', auth, userControl.createLikeStatus);

// Additions of different parameters for image download routes
router.post('/upload', upload.single('file'), uploadController.uploadUserProfil);

module.exports = router;