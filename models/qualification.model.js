const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const qualificationSchema = new Schema({
    degreeID: {
        type: String,
        required: true,
        trim: true
    },
    complitionDate: {
        type: Date,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
});

const Qualification = mongoose.model('Qualification', qualificationSchema);

module.exports = Qualification;