const mongoose = require('mongoose');

const DonanteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    identificacion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo','Inactivo','Pendiente'],
        required: true,
        default: 'Activo'
    }
});

module.exports = mongoose.model('Donante', DonanteSchema);
