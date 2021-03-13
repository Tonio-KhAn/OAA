const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gradesSchema = new Schema({
    grade: {
        type: String,
        required: true,
        trim: true
    },
   
    amount: {
        type: Number,
        required: true,
        trim: true
    },

    
}, {
    timestamps: true,
});

const Grades = mongoose.model('Grades', gradesSchema);

module.exports = Grades;