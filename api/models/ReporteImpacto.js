const mongoose = require('mongoose');

const ReporteImpactoSchema = new mongoose.Schema({
    proyecto: {
        type: String,
        required: true
    },
    beneficiariosAtendidos: {
        type: Number,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Publicado','Pendiente'],
        required: true,
        default: 'Pendiente'
    }
});

module.exports = mongoose.model('ReporteImpacto', ReporteImpactoSchema);
