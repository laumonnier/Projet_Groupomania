// Dependency used and tools of library
const express = require('express');
const router = express.Router();
const postControl = require('../controllers/post.control');
// Importing the password middleware

// Additions of the various endpoints
router.post('/', postControl.createPost);
router.get('/', postControl.readPost);
router.put('/:id', postControl.updatePost);
router.delete('/:id', postControl.deletePost);

// Additions of the various parameters concerning the routes of the user in the site


module.exports = router;