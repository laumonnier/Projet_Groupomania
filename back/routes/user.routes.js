// Dependency used and tools of library
const express = require('express');
const router = express.Router();
// const { auth } = require('../middleware/auth');
// const { userAuth } = require('../middleware/auth'); // Provides "basic" user access rights
// const { adminAuth } = require('../middleware/auth');// Provides "admin" user access rights
const authController = require ('../controllers/auth.controller');
const uploadController = require ('../controllers/upload.controller');
const userController = require ('../controllers/user.controller');
const multer = require ('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}; 

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../groupomania/public/uploads/profile");
    },
    filename: (req, file, callback) => {
        console.log(file);
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
const upload = multer({ storage: storage });
// Importing the password middleware
const password = require ('../middleware/password');

// Additions of the various endpoints
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logOut', authController.logOut); // userAuth

// Additions of the various parameters concerning the routes of the user in the site
router.get('/', userController.getAllUsers); // adminAuth
router.get('/:id', userController.getOneUser); // adminAuth
router.put('/:id', userController.updateUser); // userAuth
router.put('/:id', userController.updateRole); // adminAuth
router.delete('/:id', userController.deleteUser); // adminAuth
router.patch('/follow/:id', userController.followUser);
router.patch('/unfollow/:id', userController.unfollowUser);
// router.post('/:id/like', userController.createLikeStatus);

// Additions of different parameters for image download routes
router.post('/upload', upload.single('file'), uploadController.uploadUserProfile);

module.exports = router;