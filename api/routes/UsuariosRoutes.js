// routes/usuarioRoutes.js
const express = require('express');
const route = express.Router();

const Usuario = require('../models/Usuario');

// Crear un nuevo usuario (POST /api/usuarios)
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
        resp.status(400).json({ mensaje: error.message });
    }
});

// Update (PUT /api/usuarios/:id)
route.put('/:id', async (req, resp) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!usuarioActualizado) {
            return resp.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        resp.status(200).json(usuarioActualizado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Delete (DELETE /api/usuarios/:id)
route.delete('/:id', async (req, resp) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(
            req.params.id
        );

        if (!usuarioEliminado) {
            return resp.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        resp.status(200).json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// 🔹 Obtener un usuario por ID (GET /api/usuarios/:id)
route.get('/:id', async (req, resp) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return resp.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        resp.json(usuario);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// Obtener todos los usuarios (GET /api/usuarios)
route.get('/', async (req, resp) => {
    try {
        const usuariosDatos = await Usuario.find();
        resp.json(usuariosDatos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

module.exports = route;
