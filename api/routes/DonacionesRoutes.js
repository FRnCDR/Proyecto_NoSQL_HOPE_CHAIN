const express = require('express');
const route = express.Router();

const Donacion = require('../models/Donacion');


// Crear una nueva donación
route.post('/', async (req, resp) => {
    const { 
        idDonante,
        monto,
        fecha,
        metodoPago,
        estado 
    } = req.body;

    const nuevaDonacion = new Donacion({
        idDonante,
        monto,
        fecha,
        metodoPago,
        estado
    });

    try {
        const donacionGuardada = await nuevaDonacion.save();
        resp.status(201).json(donacionGuardada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const donacionActualizada = await Donacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!donacionActualizada) {
            return resp.status(404).json({ mensaje: "Donación no encontrada" });
        }

        resp.status(200).json(donacionActualizada);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const donacionEliminada = await Donacion.findByIdAndDelete(req.params.id);

        if (!donacionEliminada) {
            return resp.status(404).json({ mensaje: "Donación no encontrada" });
        }

        resp.status(200).json({ mensaje: 'Donación eliminada' });
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});


// Obtener TODAS las donaciones
route.get('/', async (req, resp) => {
    try {
        const donacionesDatos = await Donacion.find();
        resp.json(donacionesDatos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});


// Obtener una donación por ID 
route.get('/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const donacion = await Donacion.findById(id);

        if (!donacion) {
            return resp.status(404).json({ mensaje: 'Donación no encontrada' });
        }

        resp.json(donacion);

    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});


module.exports = route;