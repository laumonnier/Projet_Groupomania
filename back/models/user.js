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
        role: {
           type: String,
           required: true,
           default: "basic" 
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
            type: [String],
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

// Use the function before saving the set
// This function allows the salting of the password so that it is more difficult to decrypt
userSchema.pre("save", function(next) {
    const salt = bcrypt.genSaltSync(15);
    this.password = bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
    
        if (auth) {
            return user;
        }
        throw Error("Le Mot de passe est incorrect !!!");
    }
    throw Error("L'email est incorrect !!!");
};



module.exports = mongoose.model('User', userSchema);