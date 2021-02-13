const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userMediaSchema = new Schema({
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: Date,
        required: true,
        trim: true
    },
  
}, {
    timestamps: true,
});

const UserMedia = mongoose.model('UserMedia', userMediaSchema);

module.exports = UserMedia;