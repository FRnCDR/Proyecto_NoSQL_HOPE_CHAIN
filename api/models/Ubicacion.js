const mongoose = require('mongoose');

const UbicacionSchema = new mongoose.Schema({
    pais: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    sede: {
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

module.exports = mongoose.model('Ubicacion', UbicacionSchema);
