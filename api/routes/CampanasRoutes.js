const express = require('express');
const route = express.Router();

const Campana = require('../models/Campana');

// Crear una nueva campaña
route.post('/', async (req, resp) => {
    const { 
        nombre,
        objetivo,
        fechaInicio,
        estado
    } = req.body;

    const nuevaCampana = new Campana({
        nombre,
        objetivo,
        fechaInicio,
        estado
    });

    try {
        const campanaGuardada = await nuevaCampana.save();
        resp.status(201).json(campanaGuardada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const campanaActualizada = await Campana.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!campanaActualizada) {
            return resp.status(404).json({ mesaje: "Campaña no encontrada" });
        }

        resp.status(200).json(campanaActualizada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const campanaEliminada = await Campana.findByIdAndDelete(
            req.params.id
        );

        if (!campanaEliminada) {
            return resp.status(404).json({ mesaje: "Campaña no encontrada" });
        }

        resp.status(200).json({ mesaje: 'Campaña eliminada' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Obtener todas las campañas
route.get('/', async (req, resp) => {
    try {
        const campanasDatos = await Campana.find();
        resp.json(campanasDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

module.exports = route;
