// Dependancies used
const mongoose = require ('mongoose');
const { isEmail } = require ('validator');
const bcrypt = require ('bcrypt');

// This corresponds to the typical model that each user will use and will be saved in the database
const userSchema = new mongoose.Schema(
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
            // lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            maxlength: 150,
            minlength: 8
        },
        role: {
           type: String,
           required: true,
           default: "basic" 
        },
        picture: {
            type: String,
            default: "./images/photo-profile.jpg"
        },               
        description: {
            type: String,
            maxlength: 1000,
            trim: true
        },
        likes: {
            type: Number,
            type: [String]
        },
        followers: {
            type: [String]
        },
        following: {
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

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password !!!");
    }
    throw Error("Incorrect email !!!");
};

module.exports = mongoose.model('user', userSchema);