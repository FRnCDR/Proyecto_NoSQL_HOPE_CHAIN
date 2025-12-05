const express = require('express');
const route = express.Router();

const Auditoria = require('../models/Auditoria');


// Crear una nueva auditoría
route.post('/', async (req, resp) => {
    const { 
        idUsuario,
        accion,
        fecha,
        descripcion
    } = req.body;

    const nuevaAuditoria = new Auditoria({
        idUsuario,
        accion,
        fecha,
        descripcion
    });

    try {
        const auditoriaGuardada = await nuevaAuditoria.save();
        resp.status(201).json(auditoriaGuardada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const auditoriaActualizada = await Auditoria.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!auditoriaActualizada) {
            return resp.status(404).json({ mesaje: "Auditoría no encontrada" });
        }

        resp.status(200).json(auditoriaActualizada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const auditoriaEliminada = await Auditoria.findByIdAndDelete(
            req.params.id
        );

        if (!auditoriaEliminada) {
            return resp.status(404).json({ mesaje: "Auditoría no encontrada" });
        }

        resp.status(200).json({ mesaje: 'Auditoría eliminada' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todas las organizaciones
route.get('/', async (req, resp) => {
    try {
        const auditoriasDatos = await Auditoria.find();
        resp.json(auditoriasDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

route.get('/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const auditoriasDatos = await Auditoria.findById(id);
        resp.json(auditoriasDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

module.exports = route;
