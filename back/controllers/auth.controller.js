// Dependency used and Schema used
const User = require('../models/user');
const { signUpErrors, loginErrors } = require('../utils/errors');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');


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

// Allows the user to login to the company’s social site
exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', {value:token}, {httpOnly: true, maxAge: 1000*24*60*60});//maxAge 
        res.status(200).json({
            message: "L'utilisateur est bien connecté !",
            userId: user._id
            })
    } catch (err){
        console.log(err);
        const errors = loginErrors(err)
        res.status(401).json({ errors })
    }
}; 

// exports.login = (req, res, next) => {
//     User.findOne({email: req.body.email})        
//         .then((user) => {            
//                 return (
//                     // res.status(201).json({ message: 'L\'email est correct'})
//                     bcrypt.compare(req.body.password, user.password)
//                 )
//             })
//                 .then((user) => {                    
//                     const token = jwt.sign(
//                         {userId: user._id}, 
//                         process.env.TOKEN,
//                         // {expiresIn: '24h'}
//                         )
//                     res.cookie('jwt', {value: token}, {httpOnly: true, maxAge: 1000*24*60*60});//maxAge 
//                     res.status(200).json({
//                         message: "L'utilisateur est bien connecté !",
//                         userId: user._id
//                         })                 
//                 })   
//                 .catch((err) => {
//                     const errors = loginErrors(err)
//                     res.status(401)
//                     .json({errors})
//                 })   
//         .catch((err) => {
//             const errors = loginErrors(err)
//             res.status(401)
//             .json({errors})
//         })
            
// };
            
// exports.login = (req, res, next) => {
//     User.findOne({email: req.body.email})        
//         .then(user => {            
//             if(!user){
//                 return res.status(401).json({ message: 'est Incorrect'});
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if(!valid){
//                         return res.status(401).json({ message: 'Le mot de passe est incorrect'});
//                     }else{
//                     const token = jwt.sign(
//                         {userId: user._id}, 
//                         process.env.TOKEN,
//                         // {expiresIn: '24h'}
//                         )
//                     res.cookie('jwt', {value: token}, {httpOnly: true, maxAge: 1000*24*60*60});//maxAge 
//                     res.status(200).json({
//                         message: "L'utilisateur est bien connecté !",
//                         userId: user._id
//                         })              
                    
//                 } 
//                 })  
//                 .catch(err => res.status(500).json({ error: err }));      
//         })    
//         .catch(err => res.status(500).json({ error: err }));
            
// };                    

// exports.login = (req, res, next) => {
//     User.findOne({email: req.body.email})        
//         .then(user => {            
//             if(!user){
//                 return res.status(401).json({ message: 'est Incorrect'});
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if(!valid){
//                         return res.status(401).json({ message: 'Le mot de passe est incorrect'});
//                     }else{
//                     const token = jwt.sign(
//                         {userId: user._id}, 
//                         process.env.TOKEN,
//                         // {expiresIn: '24h'}
//                         )
//                     res.cookie('jwt', {value: token}, {httpOnly: true, maxAge: 1000*24*60*60});//maxAge 
//                     res.status(200).json({
//                         message: "L'utilisateur est bien connecté !",
//                         userId: user._id
//                         })              
                    
//                 } 
//                 })  
//                 .catch(err => res.status(500).json({ error: err }));      
//         })    
//         .catch(err => res.status(500).json({ error: err }));
            
// };

// exports.login = (req, res, next) => {
//     User.findOne({email: req.body.email})        
//         .then((user) => {            
//             bcrypt.compare(req.body.password, user.password)
//                 .then((valid){
//                     const token = jwt.sign(
//                         {userId: user._id}, 
//                         process.env.TOKEN,
//                         // {expiresIn: '24h'}
//                         )
//                     res.cookie('jwt', {value: token}, {httpOnly: true, maxAge: 1000*24*60*60});//maxAge 
//                     res.status(200).json({
//                         message: "L'utilisateur est bien connecté !",
//                         userId: user._id
//                         })              
                    
//                 }
                   
//         })    
//         .catch((err) => {
//             const errors = loginErrors(err)
//             res.status(401).json({ errors })
//         });
            
// };    

// Allows the user to logOut to the company’s social site
exports.logOut = (req, res, next) => {
// res.status(200).clearCookie('jwt', {path:'/'});
res.cookie('jwt', '', {maxAge: 1});
res.status(200).json({ message: "La session est terminée !"})
res.redirect('/')   
};