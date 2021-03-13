const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseNameSchema = new Schema({
    courseCode: {
        type: String,
        required: true,
        trim: true
    },
    courseTitle: {
        type: String,
        required: true,
        trim: true
    },
    
    skills: {
        type: Array,
        trim: true
    },

    
}, {
    timestamps: true,
});

const CourseName = mongoose.model('CourseName', courseNameSchema);

module.exports = CourseName;