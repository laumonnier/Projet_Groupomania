// Dependency used and tools of library
const express = require('express');
const router = express.Router();
// const { userAuth } = require('../middleware/auth'); // Provides "basic" user access rights
// const { adminAuth } = require('../middleware/auth'); // Provides "admin" user access rights
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer();

// Additions of the various endpoints
router.post('/', upload.single('file'), postController.createPost); // userAuth
router.get('/', postController.getAllPost);
router.get('/:id', postController.getOnePost);
router.put('/:id', postController.updatePost); // userAuth
router.delete('/:id', postController.deletePost); // adminAuth
router.patch('/like-post/:id', postController.likedPostStatus);
router.patch('/unlike-post/:id', postController.unlikedPostStatus);

// Additions of the various parameters concerning the routes of the comment in the site
router.patch('/post-comment/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost); // adminAuth
router.patch('/delete-comment-post/:id', postController.deleteCommentPost); // adminAuth

module.exports = router;