const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors');
const pipeline = promisify(require('stream').pipeline);
const ObjectId = require('mongoose').Types.ObjectId;

// Additions of the various endpoints
// business logic for creating a post account
exports.createPost = async (req, res) => {
    let fileName;
    console.log(req.file.mimetype)
    if(req.file !== null){
        try{
        if(
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/jpeg" &&
            req.file.detectedMimeType !== "image/png" 
         )
         throw Error('invalid file')
    
         if(req.file.size > 300000) throw Error('max size');
        } catch (err){
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }

        const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png'
        };
    
        fileName = (req, file, callback) => {
                const name = file.originalname.split(' ').join('_');
                const extension = MIME_TYPES[file.mimetype];
                callback(null, name + Date.now() + '.' + extension);
        }

        await pipeline(
                req.file.stream,
                fs.createWriteStream(
                    `${__dirname}/../groupomania/public/uploads/posts/${fileName}`
                )
        );
    }
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        usersLiked: [],
        comments: []
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(401).json(err);
    }
};

// Business logic for obtaining all posts
exports.getAllPost = (req, res, next) => {
    PostModel.find().sort({ createdAt: -1 })
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
            .json("L'Id du Post n'existe pas : " + req.params.id)
        )
    }else{
    PostModel.findById(
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
        .json("L'Id du Post n'existe pas : " + req.params.id)
    
    const updatedRecord = {
        message: req.body.message
    }    

    try{
        PostModel.findOneAndUpdate(
            req.params.id,
            { $set: {message: req.body.message }},
            { new: true },
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
exports.deletePost = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'Id du Post n'existe pas : " + req.params.id)
   
    PostModel.findByIdAndRemove({_id: req.params.id})
        .then((post) => {
            res.status(201)
            .json("Le post à été supprimé avec succès !" + req.params.id)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        })
}

// business logic concerning the liking of a Status Like of posts
exports.likedPostStatus = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'Id du Post n'existe pas : " + req.params.id)

    try{
        await PostModel.findByIdAndUpdate(
             req.params.id,
             {
                $addToSet: { usersLiked: req.body.id },
             },
             { new: true })
             .catch((err) => {
                res.status(400)
                .json({ error: err })
            })
        
        await UserModel.findByIdAndUpdate(
             req.body.id,
             {
                $addToSet: { likes: req.params.id }
             },
             { new: true }
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) =>{
                res.status(400)
                .json({ error: err })
            })
        
    }catch (err){
        return res.status(400).json({ error: err });
    }
} 

// business logic concerning the unliking of a Status Like of posts
exports.unlikedPostStatus = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'Id du Post n'existe pas : " + req.params.id)

    try{
        await PostModel.findByIdAndUpdate(
             req.params.id,
             {
                $pull: { usersLiked: req.body.id },
             },
             { new: true })
             .catch((err) => {
                res.status(400)
                .json({ error: err })
            }
        )
        await UserModel.findByIdAndUpdate(
            req.body.id,
             {
                $pull: { likes: req.params.id }
             },
             { new: true }
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) =>{
                res.status(400)
                .json({ error: err })
            })
        
    }catch (err) {
        return res.status(401).json({ error: err });
    }
}

// Business logic regarding comments put in Posts
exports.commentPost = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'Id du Post n'existe pas : " + req.params.id)
    try{
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        comment: req.body.comment,
                        timestamp: new Date().getTime()
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
        res.status(401).json({ error: err })
    }

}

// Business logic for editing comments in Posts
exports.editCommentPost = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'Id du Post n'existe pas : " + req.params.id)

    try{
        return PostModel.findById(
            req.params.id,
            (err, data) => {
                const theComment = data.comments.find((comment) => 
                comment._id.equals(req.body.commentId)
                )

                if(!theComment) return res.status(400).json('Le commentaire n\'est pas trouvé')
                theComment.comment = req.body.comment;

                return data.save()
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
       return res.status(400).json({ error: err })
    }
}



// Business logic for deleting comments in Posts
exports.deleteCommentPost = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'Id du Post n'existe pas : " + req.params.id)

    try{
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
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
    catch(err){
        res.status(500).json({ error: err })
    }
}

    
