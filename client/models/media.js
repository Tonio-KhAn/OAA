const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: Date,
        required: true,
        trim: true
    },
  
}, {
    timestamps: true,
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;