const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const degreeNameSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    courses:{
        type: Array,
        trim:true,
    }
}, {
    timestamps: true,
});

const DegreeName = mongoose.model('DegreeName', degreeNameSchema);

module.exports = DegreeName; 
