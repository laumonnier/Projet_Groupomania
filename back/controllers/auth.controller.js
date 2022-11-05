// Dependency used and Schema used
const UserModel = require('../models/user.model.js');
const { signUpErrors, signInErrors } = require('../utils/errors');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN, {})
}


// Additions of the various endpoints
// business logic for creating a user account
exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;//destructuring
    try{
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id })
    }catch(err){
        const errors = signUpErrors(err);
        res.status(200).send({ errors }); 
    }
}

// Allows the user to login to the company’s social site
exports.signIn = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true});
        res.status(200).json({
            message: "L'utilisateur est bien connecté !",
            user: user._id
            })
    } catch (err){
        console.log(err);
        const errors = signInErrors(err)
        res.status(200).json({ errors })
    }
};     

// Allows the user to logOut to the company’s social site
exports.logOut = (req, res) => {
res.cookie('jwt', '', {maxAge: 1});
res.status(200).json({ message: "La session est terminée !"})
res.redirect('/')   
};