const express = require('express');
const route = express.Router();

const ProyectoSolidario = require('../models/ProyectoSolidario');


// Crear un nuevo proyecto solidario
route.post('/', async (req, resp) => {
    const { 
        nombre,
        descripcion,
        fechaInicio,
        fechaFin,
        estado
    } = req.body;

    const nuevoProyecto = new ProyectoSolidario({
        nombre,
        descripcion,
        fechaInicio,
        fechaFin,
        estado
    });

    try {
        const proyectoGuardado = await nuevoProyecto.save();
        resp.status(201).json(proyectoGuardado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const proyectoActualizado = await ProyectoSolidario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!proyectoActualizado) {
            return resp.status(404).json({ mesaje: "Proyecto solidario no encontrado" });
        }

        resp.status(200).json(proyectoActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const proyectoEliminado = await ProyectoSolidario.findByIdAndDelete(
            req.params.id
        );

        if (!proyectoEliminado) {
            return resp.status(404).json({ mesaje: "Proyecto solidario no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Proyecto solidario eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todos los proyectos solidarios
route.get('/', async (req, resp) => {
    try {
        const proyectosDatos = await ProyectoSolidario.find();
        resp.json(proyectosDatos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// Obtener un proyecto solidario por ID
route.get('/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const proyectosDatos = await ProyectoSolidario.findById(id);
        if (!proyectosDatos) {
            return resp.status(404).json({ mensaje: 'Proyecto no encontrado' });
        }
        resp.json(proyectosDatos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});







module.exports = route;




