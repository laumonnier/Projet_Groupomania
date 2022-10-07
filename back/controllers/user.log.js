const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Allows the user to login to the company’s social site
exports.login = (req, res, next) => {
        User.findOne({email: req.body.email})        
            .then(user => {            
                if(!user){
                    return res.status(401).json({ message: 'Pair login/password Incorrect'});
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid){
                            return res.status(401).json({ message: 'Pair login/password Incorrect'});
                        }else{
                        const token = jwt.sign(
                            {userId: user._Id, role: user.role }, 
                            process.env.TOKEN
                            )
                        res.cookie('jwt', {value: token}, {httpOnly: true}); 
                        res.status(200).json({
                            message: "L'utilisateur est bien connecté !",
                            user,
                            })              
                        
                    } 
                    })  
                    .catch(err => res.status(500).json({ error: err }));      
            })    
            .catch(err => res.status(500).json({ error: err }));
                
};    

// Allows the user to login to the company’s social site
exports.logout = (req, res, next) => {
    // res.status(200).clearCookie('jwt', {path:'/'});
    res.cookie('jwt', '')
    res.status(200).json({ message: "La session est terminée !"})
    res.redirect('/login')   
};
