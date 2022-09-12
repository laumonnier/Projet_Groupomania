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
            minLength: 3,
            maxLength: 35,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 200,
            minLength: 6
        },
        picture: {
            type: String,
            default: "../images/image_default.png"
        },
        lastName: {
            type: String,
        },
        firstName: {
            type: String,
        },               
        description: {
            type: String,
            maxLength: 1000,
            trim:true
        },
        likes: {
            type: [String]
        },dislikes: {
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

module.exports = mongoose.model('user', userSchema);