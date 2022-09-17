// Dependancies used
const mongoose = require ('mongoose');
const { isEmail } = require ('validator');
const bcrypt = require ('bcrypt');

// This corresponds to the typical model that each user will use and will be saved in the database
const userSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 35,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 200,
            minlength: 6
        },
        picture: {
            type: String,
            default: "../images/image_default.png"
        },
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },               
        description: {
            type: String,
            maxlength: 1000,
            trim: true
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        usersLiked: {
            type: [String]
        },
        usersDisliked: {
            type: [String]
        }
    },
    {
        timestamps: true,
    }
);

// Use the function before saving the set
// This function allows the salting of the password so that it is more difficult to decrypt
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSaltSync(15);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// userSchema.login = async function (email, password) {
//     const user = await this.findOne({ email })
//         if(user){
//             const auth = bcrypt.compare(password, user.password)
//                 if(auth){
//                         return user;
//                 }
//                 throw Error('Incorrect password');
//         }
//         throw Error('Incorrect email')
//                 .catch(err => res.status(401).json({ message: 'Incorrect login/password pair'}));
//             }
//         })
//         .catch(err => res.status(500).json({ error: err }));
// }
//     if(user) {
//         const auth = await bcrypt.compare(password, user.password);
//             if(auth) {
//                 return user
//             }
//             throw Error('Incorrect password');
//         }
//         throw Error('Incorrect email')

// };

// exports.login = (req, res, next) => {
        
//     User.findOne({email: req.body.email})        
//         .then(user => {
//             const token = createToken(user._id)
//             res.cookie('jwt', token, {httpOnly: true}, {maxAge: 12*60*60*1000})
//             if(!user){
//                 return res.status(401).json({ message: 'Incorrect login/password pair'});
//             }
            
//             // const userId = user._id
//             // const token = jwt.sign(
//             // { userId: userId}, 
//             // process.env.TOKEN,
//             // {expiresIn: '24h'})
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if(!valid){
//                         return res.status(401).json({ message: 'Incorrect login/password pair'});
//                     }
                    
//                     res.status(200)
                    
//                     .json({
//                         userId: user._id,
//                         token: token
//                         // token : jwt.sign(
//                         //     { userId: user._id}, 
//                         //     process.env.TOKEN,
//                         //     {expiresIn: '24h'}
//                     })
                    
                    
                
//                 .catch(err => res.status(500).json({ error: err }));      
//         })    
//         .catch(err => res.status(500).json({ error: err }))        
// });     
// }
    

module.exports = mongoose.model('user', userSchema);