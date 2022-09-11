const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

// Additions of the various endpoints
// business logic for creating a user account
module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({pseudo: pseudo, email: email, password: password});
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        res.status(400).send({ error: err })
    }
}