const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
    {
        lastName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
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
            max: 100,
            minLength: 6
        },
        description: {
            type: String,
            maxLength: 1000,
            trim:true
        }
    }
)