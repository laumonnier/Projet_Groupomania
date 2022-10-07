const jwt = require ('jsonwebtoken');
const secretJwt = process.env.TOKEN;


// Verifying a user's authentification on the account
exports.auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretJwt);
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
        