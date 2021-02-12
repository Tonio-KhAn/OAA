const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobQualificationSchema = new Schema({
   jobID: {
        type: String,
        required: true,
        trim: true
    },
    qualificationID: {
        type: String,
        required: true,
        trim: true
    },
    
}, {
    timestamps: true,
});

const JobQualification = mongoose.model('JobQualification', jobQualificationSchema);

module.exports = JobQualification;