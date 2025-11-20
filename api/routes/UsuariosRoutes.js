const express = require('express');
const route = express.Router();

const Usuario = require('../models/Usuario');


// Crear un nuevo usuario
route.post('/', async (req, resp) => {
    const { 
        nombreUsuario,
        correo,
        rol,
        estado
    } = req.body;

    const nuevoUsuario = new Usuario({
        nombreUsuario,
        correo,
        rol,
        estado
    });

    try {
        const usuarioGuardado = await nuevoUsuario.save();
        resp.status(201).json(usuarioGuardado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!usuarioActualizado) {
            return resp.status(404).json({ mesaje: "Usuario no encontrado" });
        }

        resp.status(200).json(usuarioActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(
            req.params.id
        );

        if (!usuarioEliminado) {
            return resp.status(404).json({ mesaje: "Usuario no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Usuario eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todos los usuarios
route.get('/', async (req, resp) => {
    try {
        const usuariosDatos = await Usuario.find();
        resp.json(usuariosDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

module.exports = route;
