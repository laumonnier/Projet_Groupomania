const UserModel = require('../models/user.model');
const ObjectId = require ('mongoose').Types.ObjectId;

// Business logic for obtaining all Users
exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
            res.status(200).json(users)
};

// Business logic for obtaining a single User
exports.getOneUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).json("L'id ne correspond pas :" + req.params.id)    
    }
        
    UserModel.findById(req.params.id).select('-password')
            .then((data) => { 
                res.status(200).json(data)
            })
            .catch ((err) => {
                res.status(400).json({ error : err })
            });   
    };


// Business logic for adding or changing a User’s data
exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'id ne correspond pas :" + req.params.id)
        
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id},
            {
                $set: {
                    description: req.body.description
                }
            },
            { new: true,
              upsert: true, 
              setDefaultsOnInsert: true
            }
        )
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err});  
    }
};

// Business logic for adding or changing a User’s role
exports.updateRole = (req, res, next) => {// A refaire
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'id ne correspond pas :" + req.params.id)
    const { role, id } = req.body
        
    try {
        UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    description: req.body.role
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true}
        )
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err});  
    }
};

// Business logic concerning the deletion of a user
exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'id ne correspond pas :" + req.params.id)
    
    try{
        await UserModel.remove({_id: req.params.id}).exec();
            res.status(200).json({ message: "L'utilisateur a bien été supprimer !"}) // Attention res et user
    } catch (err) {
            res.status(400).json({ error: err })
        }
} 

exports.followUser = async (req, res) => {
    console.log('Nous sommes bien sur la middleware followUser');
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).json("L'id ne correspond pas :" + req.params.id)
    
    try{
        //Add a follower to your list
        console.log("Salut toi");
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow}},
            { new: true, upsert: true}
        )
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            });
        
        //Add a following to your list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id}},
            { new: true, upsert: true}
        )
        //We cannot make 2 response status in 201 as this would provide an error
            // .then((data) => {
            //     res.status(201)
            //     .json(data)
            // })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            });
             
    } catch (err) {
        return res.status(500).json({ message: err});
    } 
}

exports.unfollowUser = async (req, res) => {
    console.log('Nous sommes bien sur la middleware unfollowUser');
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
        return res.status(400).json("L'id ne correspond pas :" + req.params.id)

    try{
        console.log("Salut pas toi");
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow}},
            { new: true, upsert: true}
        )
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            });
            
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id}},
            { new: true, upsert: true}
        )
            // .then((data) => {
            //     res.status(201)
            //     .json(data)
            // })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            }); 
    } catch (err) {
        return res.status(500).json({ message: err});
    }
}           

// business logic concerning the creation of a Status Like
exports.createLikeStatus = (req, res) => {
    console.log(req.body);
    UserModel.findOne({_id: req.params})
        .then(user => {
            try{
                if(!(user.usersLiked.includes(req.body._id)) && req.body.like === 1){ // The "includes" method will check whether the data is present or not in the parameter defined
                    console.log('Adding like !');
                    UserModel.updateOne(
                        {_id: req.params.id},
                        {
                            $inc: {likes: 1}, // Operator "$inc" will increment a value to an existing data
                            $push: {usersLiked: req.body._id} // The operator "$push" will add a data to an existing array
                        }
                    )
                        .then(() => {
                            res.status(201)
                            .json( 'LikeStatus created ! ')
                        })
                        .catch((err) =>{
                            res.status(400)
                            .json({ error: err })
                        });
                    console.log('like used = 1 !');

                }else if(!(user.usersDisliked.includes(req.body._id)) && req.body.like === -1){
                    console.log('The user dislike !');
                    UserModel.updateOne(
                        {_id: req.params.id},
                        {
                            $inc: {dislikes: 1},
                            $push: {usersDisliked: req.body._id}
                        }
                    )
                        .then(() => {
                            res.status(201)
                            .json( 'DislikedStatus created ! ')
                        })
                        .catch((err) => {
                            res.status(400)
                            .json({ error: err })
                        });
                    console.log('like used = -1 !');

                }else if(user.usersLiked.includes(req.body._id) && req.body.like === 0){ //The user cancels his "like"
                    console.log('canceled like !');
                    UserModel.updateOne(
                        {_id: req.params.id},
                        {
                            $inc: {likes: -1},
                            $pull: {usersLiked: req.body._id} // The operator "$pull" removes the data as a parameter
                        }
                    )
                        .then(() => {
                            res.status(201)
                            .json('likeStatus has been successfully updated !')
                        })
                        .catch((err) => {
                            res.status(400)
                            .json({ error: err })
                        });

                    copnsole.log('Canceled like !');

                }else if(user.usersDisliked.includes(req.body._id) && req.body.like === 0){
                    console.log('Canceled dislike !');
                    UserModel.updateOne(
                        {_id: req.params.id},
                        {
                            $inc: {dislikes: -1},
                            $pull: {usersDisliked: req.body._id}
                        }
                    )
                        .then(() => {
                            res.status(200)
                            .json('DislikedStatus has been successfully updated !')
                        })
                        .catch((err) => {
                            res.status(400)
                            .json({ error: err })
                        });
                    console.log('Canceled dislike !');
                }
            }catch(e){
                console.log('There is an error when the user wants to like or to dislike and is not present in the usersLiked or usersDisliked array' + 'error:' + e)
            }
        })
        .catch((err) => {
            res.status(500)
            .json({ error: err })
        });
};