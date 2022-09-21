const Post = require('../models/post');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

// Additions of the various endpoints
// business logic for creating a post account
exports.createPost = (req, res, next) => {
    let fileName;
    
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

// Business logic for obtaining all posts
exports.getAllPost = (req, res, next) => {
    Post.find().sort({ createdAt: -1 })
        .then((data) => {
            res.status(201)
            .json(data)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        })
}

// Business logic for obtaining a single post
exports.getOnePost = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return (
            res.status(400)
            .json('PostId unknown : ' + req.params.id)
        )
    }else{
    Post.findById(
        req.params.id
    )
        .then((post) => {
            res.status(201)
            .json(post)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        })
    }
};

// Business logic for adding or changing a Post’s data
exports.updatePost = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400)
        .json('PostId unknown : ' + req.params.id)
    
    try{
        Post.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    message: req.body.message
                }
            },
            { new: true, upsert: true}
        )
            .then((data) => res.status(201).json(data))
            .catch((err) => res.status(400).json({ error: err }));
    }
    catch (err) {
        return res.status(500)
        .json({ error: err })
    }
}

// Business logic concerning the deletion of a post
exports.deletePost = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json('PostId Unknown : ' + req.params.id)
   
    Post.remove({_id: req.params.id})
        .then((post) => {
            res.status(201)
            .json('Successfully post deleted :' + req.params.id)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        })
}

// business logic concerning the liking of a Status Like of posts
exports.likedPostStatus = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json('PostId Unknown : ' + req.params.id)

    try{
        Post.findByIdAndUpdate(
             req.params.id,
             {
                $addToSet: { usersLiked: req.body.id },
                $inc: { likes: 1 }
             },
             { new: true, upsert: true }
        )
        .catch((err) =>{
            res.status(400)
            .json({ error: err })
        })
        User.findByIdAndUpdate(
             req.body.id,
             {
                $addToSet: { likes: req.params.id }
             },
             { new: true, upsert: true }
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) =>{
                res.status(400)
                .json({ error: err })
            })
        
    }catch{
        return res.status(500).json({ error: err });
    }
} 

// business logic concerning the unliking of a Status Like of posts
exports.unLikedPostStatus = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json('PostId Unknown : ' + req.params.id)

    try{
        Post.findByIdAndUpdate(
             req.params.id,
             {
                $pull: { usersLiked: req.body.id },
                $inc: { likes: -1 }
             },
             { new: true, upsert: true }
        )
        .catch((err) =>{
            res.status(400)
            .json({ error: err })
        })
        User.findByIdAndUpdate(
            req.body.id,
             {
                $pull: { likes: req.params.id }
             },
             { new: true, upsert: true }
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) =>{
                res.status(400)
                .json({ error: err })
            })
        
    }catch{
        return res.status(500).json({ error: err });
    }
}

// Business logic regarding comments put in Posts
exports.commentPost = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json('PostId Unknown : ' + req.params.id)
    try{
        Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        comment: req.body.comment,
                        time: new Date().getTime()
                    }
                }
            },
            { new: true }
        )
        .then((data) => {
            res.status(201)
            .json(data)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        })

    }
    catch (err) {
        res.status(500).json({ error: err })
    }

}

// Business logic for editing comments in Posts
exports.editComment = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json('PostId Unknown : ' + req.params.id)

    try{
        return Post.findById(
            req.params.id,
            (err, data) => {
                const theComment = data.comments.find((txt) => 
                txt._id.equals(req.body.commentId)
                )

                if(!theComment) return res.status(400).json('Le commentaire n\'est pas trouvé')
                theComment.comment = req.body.comment;

                return data.save(err)
                    .then((data) => {
                        res.status(201)
                        .json(data)
                    })
                    .catch((err) => {
                        res.status(400)
                        .json({ error: err })
                    })
                }
        )
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}



// Business logic for deleting comments in Posts
exports.deleteComment = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json('PostId Unknown : ' + req.params.id)

    try{
        Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new: true, upsert: true }
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            })
    }
    catch(err){
        res.status(500).json({ error: err })
    }
}

    
