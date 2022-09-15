// Dependency used and Schema used
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Additions of the various endpoints
// business logic for creating a user account
exports.signUp = (req, res, next) => {
    console.log(req.body);
    const {pseudo, lastName, firstName, email, password} = req.body;

    try {
        User.create({ pseudo: pseudo, lastName: lastName, firstName: firstName, email: email, password: password })
            .then((user) => {
                res.status(201)
                .json({ user: user._id})
            })
            .catch((err) => {
                res.status(400)
                .json({ error: err })
            });
    }
    catch(err) {
        res.status(500).json({ error: err })
    }
}