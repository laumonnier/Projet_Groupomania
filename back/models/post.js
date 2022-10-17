const mongoose = require('mongoose');


const postSchema = mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 400
        },
        picture: {
            type: String
        },
        video: {
            type: String
        },
        likes: {
            type: Number,
            default: 0
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
                    comment: String,
                    time: Number
                }
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', postSchema);