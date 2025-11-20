const express = require('express');
const route = express.Router();

const Transaccion = require('../models/Transaccion');


// Crear una nueva transacción
route.post('/', async (req, resp) => {
    const { 
        idDonacion,
        tipo,
        monto,
        fecha
    } = req.body;

    const nuevaTransaccion = new Transaccion({
        idDonacion,
        tipo,
        monto,
        fecha
    });

    try {
        const transaccionGuardada = await nuevaTransaccion.save();
        resp.status(201).json(transaccionGuardada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const transaccionActualizada = await Transaccion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!transaccionActualizada) {
            return resp.status(404).json({ mesaje: "Transacción no encontrada" });
        }

        resp.status(200).json(transaccionActualizada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const transaccionEliminada = await Transaccion.findByIdAndDelete(
            req.params.id
        );

        if (!transaccionEliminada) {
            return resp.status(404).json({ mesaje: "Transacción no encontrada" });
        }

        resp.status(200).json({ mesaje: 'Transacción eliminada' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todas las transacciones
route.get('/', async (req, resp) => {
    try {
        const transaccionesDatos = await Transaccion.find();
        resp.json(transaccionesDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

module.exports = route;
