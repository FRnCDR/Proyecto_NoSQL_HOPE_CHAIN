const mongoose = require('mongoose');

const BeneficiarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipoBeneficiario: {
        type: String,
        required: true
    },
    contacto: {
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

module.exports = mongoose.model('Beneficiario', BeneficiarioSchema);
