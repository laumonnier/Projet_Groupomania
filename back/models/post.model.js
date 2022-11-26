const mongoose = require('mongoose');


const postSchema = mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            maxlength: 300,
            trim: true
        },
        picture: {
            type: String
        },
        video: {
            type: String
        },
        usersLiked: {
            type: [String],
            required: true
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number
                }
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('post', postSchema);