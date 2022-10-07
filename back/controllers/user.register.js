// Dependency used and Schema used
const User = require('../models/user');
const { signUpErrors } = require('../utils/errors');

// Additions of the various endpoints
// business logic for creating a user account
exports.signUp = (req, res, next) => {
    console.log(req.body);
    const {pseudo, lastName, firstName, email, password} = req.body;
    try {
        User.create({ 
            pseudo,
            lastName, 
            firstName, 
            email, 
            password
        })
            .then((user) => {
                res.status(201)
                .json({message: "L'utilisateur à bien été créé !", user: user._id })
            })
            .catch((err) => {
                const errors = signUpErrors(err)
                res.status(400)
                .json({ errors })
            });
        }
    
    catch(err) {
        res.status(500).json({ error: err })
    }
}