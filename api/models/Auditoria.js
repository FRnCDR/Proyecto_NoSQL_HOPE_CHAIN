const mongoose = require('mongoose');

const AuditoriaSchema = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: true
    },
    accion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Auditoria', AuditoriaSchema);
