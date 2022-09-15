const password = require('../middleware/password');
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

// exports.followUser = (req, res, next) => {
//     console.log('Nous sommes bien sur la middleware followUser');
//     if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
//         return res.status(400).json('Id unknown : ' + req.params.id)

//     try{

//         User.findByIdAndUpdate(
//             req.params.id,
//             { $addToSet: { following: req.body.idToFollow}},
//             { new: true, upsert: true}
//         )
//             .then((data) => {
//                 res.json(data)
//             })
//             .catch((err) => {
//                 res.status(400)
//                 .json({ error: err })
//             });
        
//         User.findByIdAndUpdate(
//             req.body.idToFollow,
//             { $addToSet: { followers: req.params.id}},
//             { new: true, upsert: true}
//         )
//             .then((data) => {
//                 res.status(201)
//                 .json(data)
//             })
//             .catch((err) => {
//                 res.status(400)
//                 .json({ error: err })
//             }); 
//     } catch (err) {
//         return res.status(500).json({ message: err});
//     } 
// }

// exports.unfollowUser = (req, res, next) => {
//     console.log('Nous sommes bien sur la middleware unfollowUser');
//     if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
//         return res.status(400).json('Id unknown : ' + req.params.id)

//     try{

//         User.findByIdAndUpdate(
//             req.params.id,
//             { $pull: { following: req.body.idToUnfollow}},
//             { new: true, upsert: true}
//         )
//             .then((data) => {
//                 res.json(data)
//             })
//             .catch((err) => {
//                 res.status(400)
//                 .json({ error: err })
//             });
            
//         User.findByIdAndUpdate(
//             req.body.idToUnfollow,
//             { $pull: { followers: req.params.id}},
//             { new: true, upsert: true}
//         )
//             .then((data) => {
//                 res.status(201)
//                 .json(data)
//             })
//             .catch((err) => {
//                 res.status(400)
//                 .json({ error: err })
//             }); 
//     } catch (err) {
//         return res.status(500).json({ message: err});
//     }
// }