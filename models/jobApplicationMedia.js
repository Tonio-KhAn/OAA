const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobApplicationMediaSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    jobApplicationID: {
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

const JobApplicationMedia = mongoose.model('JobApplicationMedia', jobApplicationMediaSchema);

module.exports = JobApplicationMedia;