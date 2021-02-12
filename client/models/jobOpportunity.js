const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobOpportunitySchema = new Schema({
    title: {
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