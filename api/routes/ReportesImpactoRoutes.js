const express = require('express');
const route = express.Router();

const ReporteImpacto = require('../models/ReporteImpacto');


// Crear un nuevo reporte de impacto
route.post('/', async (req, resp) => {
    const { 
        proyecto,
        beneficiariosAtendidos,
        periodo,
        estado
    } = req.body;

    const nuevoReporte = new ReporteImpacto({
        proyecto,
        beneficiariosAtendidos,
        periodo,
        estado
    });

    try {
        const reporteGuardado = await nuevoReporte.save();
        resp.status(201).json(reporteGuardado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const reporteActualizado = await ReporteImpacto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!reporteActualizado) {
            return resp.status(404).json({ mesaje: "Reporte de impacto no encontrado" });
        }

        resp.status(200).json(reporteActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const reporteEliminado = await ReporteImpacto.findByIdAndDelete(
            req.params.id
        );

        if (!reporteEliminado) {
            return resp.status(404).json({ mesaje: "Reporte de impacto no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Reporte de impacto eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todos los reportes de impacto
route.get('/', async (req, resp) => {
    try {
        const reportesDatos = await ReporteImpacto.find();
        resp.json(reportesDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

// Obtener reporte de impacto por ID
route.get('/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const reporte = await ReporteImpacto.findById(id);

        if (!reporte) {
            return resp.status(404).json({ mensaje: "Reporte no encontrado" });
        }

        resp.json(reporte);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

module.exports = route;
