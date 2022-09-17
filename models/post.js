const mongoose = require('mongoose');


const PostSchema = mongoose.Schema(
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

module.exports = mongoose.model('post', PostSchema);