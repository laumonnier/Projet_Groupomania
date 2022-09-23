const jwt = require ('jsonwebtoken');
const User = require ('../models/user');


// Verifying a user's authentification on the account
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken._id;
        req.auth = {
           _id: userId
        };
    next();
    } catch(err){
        res.status(401)
        .json({ Message: 'unauthorized request'});
    }
};