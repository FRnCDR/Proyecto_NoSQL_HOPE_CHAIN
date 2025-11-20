const mongoose = require('mongoose');

const TransaccionSchema = new mongoose.Schema({
    idDonacion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Entrada','Salida'],
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Transaccion', TransaccionSchema);
