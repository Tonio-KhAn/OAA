const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    jobOpportunityID: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: String,
        required: true,
        trim: true
    },
    
    rank: {
        type: Number,
        trim: true
    },

    
}, {
    timestamps: true,
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;