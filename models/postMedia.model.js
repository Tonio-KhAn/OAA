const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postMediaSchema = new Schema({
    postID: {
        type: String,
        required: true,
        trim: true
    },
    mediaName: {
        type: String,
        required: true,
        trim: true
    },
    
    
}, {
    timestamps: true,
});

const postMedia = mongoose.model('postMedia', postMediaSchema);

module.exports = postMedia;