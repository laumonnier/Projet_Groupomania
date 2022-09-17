const Post = require('../models/post');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createPost = (req, res, next) => {
    const newPost = new Post({
        posterId: req.body.posterId,
        message: req.body.message,
        // picture: req.body.picture,
        video: req.body.video,
        usersLiked: [],
        comments: []
    });

    newPost.save()
        .then((post) => {
            res.status(201)
            .json(post)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        });
    
}

exports.readPost = (req, res, next) => {
    Post.find()
        .then((data) => {
            res.status(201)
            .json(data)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        })
}

exports.updatePost = (req, res, next) => {

}

exports.deletePost = (req, res, next) => {

}