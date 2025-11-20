const mongoose = require('mongoose');

const DonacionSchema = new mongoose.Schema({
    idDonante: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    metodoPago: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Procesada','Pendiente','Cancelada'],
        required: true,
        default: 'Pendiente'
    }
});

module.exports = mongoose.model('Donacion', DonacionSchema);
