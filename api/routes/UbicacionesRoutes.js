const express = require('express');
const route = express.Router();

const Ubicacion = require('../models/Ubicacion');


// Crear una nueva ubicación
route.post('/', async (req, resp) => {
    const { 
        pais,
        region,
        sede,
        estado
    } = req.body;

    const nuevaUbicacion = new Ubicacion({
        pais,
        region,
        sede,
        estado
    });

    try {
        const ubicacionGuardada = await nuevaUbicacion.save();
        resp.status(201).json(ubicacionGuardada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const ubicacionActualizada = await Ubicacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!ubicacionActualizada) {
            return resp.status(404).json({ mesaje: "Ubicación no encontrada" });
        }

        resp.status(200).json(ubicacionActualizada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const ubicacionEliminada = await Ubicacion.findByIdAndDelete(req.params.id);

        if (!ubicacionEliminada) {
            return resp.status(404).json({ mesaje: "Ubicación no encontrada" });
        }

        resp.status(200).json({ mesaje: 'Ubicación eliminada' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todas las ubicaciones
route.get('/', async (req, resp) => {
    try {
        const ubicacionesDatos = await Ubicacion.find();
        resp.json(ubicacionesDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});


// Obtener una ubicación por ID (para EDITAR)
route.get('/:id', async (req, resp) => {
    const id = req.params.id;

    try {
        const ubicacion = await Ubicacion.findById(id);

        if (!ubicacion) {
            return resp.status(404).json({ mesaje: "Ubicación no encontrada" });
        }

        resp.json(ubicacion);

    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});


module.exports = route;
