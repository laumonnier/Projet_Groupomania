// Dependency used and tools of library
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const multer = require ('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}; 

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../groupomania/public/uploads/posts");
    },
    filename: (req, file, callback) => {
        console.log(file);
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '.' + extension);
    }
});
const upload = multer({ storage: storage });

// Additions of the various endpoints
router.post('/', upload.single('file'), postController.createPost);
router.get('/', postController.getAllPost);
router.get('/:id', postController.getOnePost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likedPostStatus);
router.patch('/unlike-post/:id', postController.unlikedPostStatus);

// Additions of the various parameters concerning the routes of the comment in the site
router.patch('/post-comment/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;