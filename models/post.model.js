const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    
    
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;