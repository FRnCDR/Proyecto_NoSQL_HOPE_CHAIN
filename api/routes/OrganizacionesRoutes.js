const express = require('express');
const route = express.Router();

const Organizacion = require('../models/Organizacion');


// Crear una nueva organización
route.post('/', async (req, resp) => {
    const { 
        nombre,
        representante,
        correo,
        telefono,
        estado
    } = req.body;

    const nuevaOrganizacion = new Organizacion({
        nombre,
        representante,
        correo,
        telefono,
        estado
    });

    try {
        const organizacionGuardada = await nuevaOrganizacion.save();
        resp.status(201).json(organizacionGuardada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const organizacionActualizada = await Organizacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!organizacionActualizada) {
            return resp.status(404).json({ mesaje: "Organización no encontrada" });
        }

        resp.status(200).json(organizacionActualizada);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const organizacionEliminada = await Organizacion.findByIdAndDelete(
            req.params.id
        );

        if (!organizacionEliminada) {
            return resp.status(404).json({ mesaje: "Organización no encontrada" });
        }

        resp.status(200).json({ mesaje: 'Organización eliminada' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todas las organizaciones
route.get('/', async (req, resp) => {
    try {
        const organizacionesDatos = await Organizacion.find();
        resp.json(organizacionesDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

route.get('/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const organizacionesDatos = await Organizacion.findById(id);
        resp.json(organizacionesDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

module.exports = route;
