const mongoose = require('mongoose');

const ProyectoSolidarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: false
    },
    estado: {
        type: String,
        enum: ['Activo','Inactivo','Pendiente'],
        required: true,
        default: 'Activo'
    }
});

module.exports = mongoose.model('ProyectoSolidario', ProyectoSolidarioSchema);
