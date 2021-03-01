const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSkillSchema = new Schema({
    jobOpportunityID: {
        type: String,
        required: true,
        trim: true
    },
    skillName: {
        type: String,
        required: true,
        trim: true
    },
    
    
}, {
    timestamps: true,
});

const JobSkill = mongoose.model('JobSkill', jobSkillSchema);

module.exports = JobSkill;