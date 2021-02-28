const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobOpportunitySchema = new Schema({
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
    company: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    
}, {
    timestamps: true,
});

const JobOpportunity = mongoose.model('JobOpportunity', jobOpportunitySchema);

module.exports = JobOpportunity;