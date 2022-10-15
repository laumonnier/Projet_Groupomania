const jwt = require ('jsonwebtoken');
const User = require('../models/user');


// Verifying a user's authentification on the account
// exports.auth = (req, res, next) => {
//     try{ 
//     const token = req.headers.authorization.split('')[1];
//     const decodedToken = jwt.verify(token, process.env.TOKEN);
//     const userId = decodedToken.userId;
//     req.auth = { userId: userId };
//     next();
//     }catch(error){
//         res.status(401).json({error:error});
//     }
// };

// Verifying a user's authentification on the account
exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next();
            }else{
                let user = User.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
};


// Verifying a user's authentification on the account
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
            if(err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('No token');
    }
};
        

// Verifying a admin user's authentification on the account
exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, secretJwt, (err, decodedToken) => {
            if (err) {
                return res.status(401)
                .json({ message: "Vous n'êtes pas authorisé !"})
            }else{
                if(decodedToken.role !== "admin") {
                    return res.status(401)
                    .json({ message: "Vous n'êtes pas authorisé !"})
                }else{
                    next()
                }
            }
        });
    } else {
        return res.status(401)
        .json({ message: "Vous n'êtes pas authorisé, le token n'ai pas valable ou plus valable"})
    }
};

// Verifying a basic user's authentification on the account
exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, secretJwt, (err, decodedToken) => {
            if (err) {
                return res.status(401)
                .json({ message: "Vous n'êtes pas authorisé !"})
            }else{
                if(decodedToken.role !== "basic") {
                    return res.status(401)
                    .json({ message: "Vous n'êtes pas authorisé !"})
                }else{
                    next()
                }
            }
        });
    } else {
        return res.status(401)
        .json({ message: "Vous n'êtes pas authorisé, le token n'ai pas valable ou plus valable"})
    }
};
        