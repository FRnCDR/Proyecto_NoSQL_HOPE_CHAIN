const mongoose = require('mongoose');

const CampanaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    objetivo: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activa','Inactiva','Pendiente'],
        required: true,
        default: 'Activa'
    }
});

module.exports = mongoose.model('Campana', CampanaSchema);
