const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const degreeNameSchema = new Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    
}, {
    timestamps: true,
});

const DegreeName = mongoose.model('DegreeName', degreeNameSchema);

module.exports = DegreeName;