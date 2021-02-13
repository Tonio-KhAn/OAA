const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobOpportunityMediaSchema = new Schema({
    jobOpportunityID: {
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

const JobOpportunityMedia = mongoose.model('JobOpportunityMedia', jobOpportunityMediaSchema);

module.exports = JobOpportunityMedia;