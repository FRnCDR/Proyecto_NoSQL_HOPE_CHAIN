const mongoose = require('mongoose');

const OrganizacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    representante: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activa','Inactiva','Pendiente'],
        required: true,
        default: 'Activa'
    }
});

module.exports = mongoose.model('Organizacion', OrganizacionSchema);
