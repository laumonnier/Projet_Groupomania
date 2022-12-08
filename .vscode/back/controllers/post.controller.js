const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors');
const ObjectId = require('mongoose').Types.ObjectId;

// Additions of the various endpoints
// business logic for creating a post account
exports.createPost = async (req, res) => {
    console.log(req.file)
    console.log("Salut");
    console.log(req.body.posterId);
    if(req.file !== undefined){
        try{
            console.log("Salut");
        if(
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/jpeg" &&
            req.file.mimetype !== "image/png" 
         )
         throw Error("invalid file");
            
         console.log("Salut");
         if(req.file.size > 600000) throw Error("max size");
        }catch (err){
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
    } 
        console.log("Salut");
    console.log(req.body.posterId);
        // const MIME_TYPES = {
        // 'image/jpg': 'jpg',
        // 'image/jpeg': 'jpg',
        // 'image/png': 'png'
        // };
    
        // fileName = (req, file, callback) => {
        //         const name = file.originalname.split(' ').join('_');
        //         const extension = MIME_TYPES[file.mimetype];
        //         callback(null, name + Date.now() + '.' + extension);
        // }

        // await pipeline(
        //         req.file.stream,
        //         fs.createWriteStream(
        //             `${__dirname}/../groupomania/public/uploads/posts/${fileName}`
        //         )
        // );
    
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== undefined ? `uploads/posts/${req.file.filename}` : "",
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

    try{
        PostModel.findByIdAndUpdate(
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
            });
        
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
                        text: req.body.text,
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
                theComment.text = req.body.text;

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

    
