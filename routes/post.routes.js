// Dependency used and tools of library
const express = require('express');
const router = express.Router();
const postControl = require('../controllers/post.control');
const multer = require('multer');
const upload = multer();

// Additions of the various endpoints
router.post('/', upload.single('file'), postControl.createPost);
router.get('/', postControl.getAllPost);
router.get('/:id', postControl.getOnePost);
router.put('/:id', postControl.updatePost);
router.delete('/:id', postControl.deletePost);
router.patch('/like-post/:id', postControl.likedPostStatus);
router.patch('/unlike-post/:id', postControl.unLikedPostStatus);

// Additions of the various parameters concerning the routes of the comment in the site
router.patch('/post-comment/:id', postControl.commentPost);
router.patch('/edit-comment/:id', postControl.editComment);
router.patch('/delete-comment/:id', postControl.deleteComment);

module.exports = router;