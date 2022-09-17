const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const password = require('../middleware/password');


exports.login = (req, res, next) => {
        User.findOne({email: req.body.email})        
            .then(user => {            
                if(!user){
                    return res.status(401).json({ message: 'Incorrect login/password pair'});
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid){
                            return res.status(401).json({ message: 'Incorrect login/password pair'});
                        }else{
                        const token = jwt.sign(
                            {userId: user._Id}, 
                            process.env.TOKEN, 
                            {expiresIn: '12h'}
                            )
                        res.cookie('jwt', {value: token}, {httpOnly: true, maxAge: 12*60*60*1000}); 
                        res.status(200).json({
                            userId: user._id
                            })              
                        
                    } 
                    })  
                    .catch(err => res.status(500).json({ error: err }));      
            })    
            .catch(err => res.status(500).json({ error: err }));
                
};    

exports.logout = (req, res, next) => {
    // res.status(200).clearCookie('jwt', {path:'/'});
    res.cookie('jwt', '', {maxAge: 1})
    res.status(200).json( 'Successfully terminated session')
    res.redirect('/login')
    
    
};
