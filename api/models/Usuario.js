const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['Administrador','Auditor','Usuario'],
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo','Inactivo','Suspendido'],
        required: true,
        default: 'Activo'
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
