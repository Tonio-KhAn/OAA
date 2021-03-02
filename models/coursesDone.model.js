const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseDoneSchema = new Schema({
    DegreeID: {
        type: String,
        required: true,
        trim: true
    },
    courseID: {
        type: String,
        required: true,
        trim: true
    },
    
    
}, {
    timestamps: true,
});

const CourseDone = mongoose.model('CourseDone', courseDoneSchema);

module.exports = CourseDone;