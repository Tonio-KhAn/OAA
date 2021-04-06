const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uwi_email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    alt_email: {
        type: String,
        required: false,
        trim: true
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    sex: {
        type: String,
        required: true,
        trim: true
    },
    resumeID: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    resetToken: {
        type: String,
        required: false,
        trim: true
    },
    resetTokenExpire: {
        type: Date,
        required: false,
        trim: true
    },
    verifiedToken: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    verified: {
        type: Boolean,
        required: true,
    },
    friends: {
        type: Array,
        trim: true
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;