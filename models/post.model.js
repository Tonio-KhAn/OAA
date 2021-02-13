const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    mediaID: {
        type: String,
        required: true,
        trim: true
    },
    
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;