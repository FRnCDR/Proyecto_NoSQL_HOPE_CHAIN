const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    autor: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['Visible','Oculto'],
        required: true,
        default: 'Visible'
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
