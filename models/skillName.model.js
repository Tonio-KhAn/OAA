const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillNameSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
}, {
    timestamps: true,
});

const SkillName = mongoose.model('SkillName', skillNameSchema);

module.exports = SkillName; 
