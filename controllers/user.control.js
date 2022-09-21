const User = require ('../models/user');
const ObjectId = require ('mongoose').Types.ObjectId;

// Business logic for obtaining all Users
exports.getAllUsers = (req, res, next) => {
    console.log("Nous sommes sur la middleware getAllUsers !");
    User.find().select('-password')
        .then((users) => {
            res.status(200)
            .json(users)
        })
        .catch((err) => {
            res.status(400)
            .json({ error: err })
        });
};

// Business logic for obtaining a single User
exports.getOneUser = (req, res, next) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id)){
        return (
            res.status(400)
            .json('Id unknown : ' + req.params.id)
        )
    }else{
        User.findById(req.params.id).select('-password')
            .then((data) => { 
                res.status(200)
                .json(data)
            })
            .catch((err) => {
                res.status(500)
                .json({ error : err })
            });
        
    }
};

// Business logic for adding or changing a User’s data
exports.updateUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json('Id unknown : ' + req.params.id)
        
    try {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    description: req.body.description
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
exports.deleteUser = (req, res, next) => {
    console.log('Nous sommes bien sur la middleware deleteUser');
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json('Id unknown : ' + req.params.id)
    
    User.remove({_id: req.params.id})
        .then(() => {
            res.status(200)
            .json({ message: "Successfully user deleted ! "})
        })
        .catch((err) => {
            res.status(500)
            .json({ error: err })
        })
} 

exports.followUser = (req, res, next) => {
    console.log('Nous sommes bien sur la middleware followUser');
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).json('Id unknown : ' + req.params.id)

    try{

        User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow}},
            { new: true, upsert: true}
        )
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            });
        
        User.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id}},
            { new: true, upsert: true}
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            }); 
    } catch (err) {
        return res.status(500).json({ message: err});
    } 
}

exports.unfollowUser = (req, res, next) => {
    console.log('Nous sommes bien sur la middleware unfollowUser');
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
        return res.status(400).json('Id unknown : ' + req.params.id)

    try{

        User.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow}},
            { new: true, upsert: true}
        )
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            });
            
        User.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id}},
            { new: true, upsert: true}
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
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
    User.findOne({_id: req.params})
        .then(user => {
            try{
                if(!(user.usersLiked.includes(req.body._id)) && req.body.like === 1){ // The "includes" method will check whether the data is present or not in the parameter defined
                    console.log('Adding like !');
                    User.updateOne(
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
                    User.updateOne(
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
                    User.updateOne(
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
                    User.updateOne(
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