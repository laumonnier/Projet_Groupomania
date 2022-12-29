// Dependency used and tools of library
const express = require('express');
const router = express.Router();
const authController = require ('../controllers/auth.controller');
const uploadController = require ('../controllers/upload.controller');
const userController = require ('../controllers/user.controller');
const multer = require ('../middleware/multer-config.js');

// Importing the password middleware
const password = require ('../middleware/password');

// Additions of the various endpoints
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logOut', authController.logOut);

// Additions of the various parameters concerning the routes of the user in the site
router.get('/', userController.getAllUsers); 
router.get('/:id', userController.getOneUser); 
router.put('/:id', userController.updateUser); 
router.put('/:id', userController.updateRole); 
router.delete('/:id', userController.deleteUser); 
router.patch('/follow/:id', userController.followUser);
router.patch('/unfollow/:id', userController.unfollowUser);

// Additions of different parameters for image download routes
router.post('/upload', multer, uploadController.uploadUserProfile);

module.exports = router;