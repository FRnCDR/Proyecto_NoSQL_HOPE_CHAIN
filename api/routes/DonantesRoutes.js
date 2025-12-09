const express = require('express');
const route = express.Router();

const Donante = require('../models/Donante');

// Crear
route.post('/', async (req, resp) => {
    const { nombre, identificacion, telefono, correo, estado } = req.body;

    const nuevoDonante = new Donante({ nombre, identificacion, telefono, correo, estado });

    try {
        const guardado = await nuevoDonante.save();
        resp.status(201).json(guardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Actualizar
route.put('/:id', async (req, resp) => {
    try {
        const actualizado = await Donante.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!actualizado) return resp.status(404).json({ mensaje: "Donante no encontrado" });

        resp.json(actualizado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Eliminar
route.delete('/:id', async (req, resp) => {
    try {
        const eliminado = await Donante.findByIdAndDelete(req.params.id);

        if (!eliminado) return resp.status(404).json({ mensaje: "Donante no encontrado" });

        resp.json({ mensaje: "Donante eliminado" });
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos
route.get('/', async (req, resp) => {
    try {
        const datos = await Donante.find();
        resp.json(datos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});


// Obtener un donante por ID 
route.get('/:id', async (req, resp) => {
    const id = req.params.id;

    try {
        const donante = await Donante.findById(id);

        if (!donante) {
            return resp.status(404).json({ mensaje: "Donante no encontrado" });
        }

        resp.json(donante);

    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

module.exports = route;
