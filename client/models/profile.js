const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profilePictureID: {
        type: String,
        required: true,
        trim: true
    },
    
}, {
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;