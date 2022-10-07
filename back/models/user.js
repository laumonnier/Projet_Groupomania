// Dependancies used
const mongoose = require ('mongoose');
const { isEmail } = require ('validator');
const bcrypt = require ('bcrypt');

// This corresponds to the typical model that each user will use and will be saved in the database
const UserSchema = mongoose.Schema(
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
UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSaltSync(15);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});    

module.exports = mongoose.model('user', UserSchema);