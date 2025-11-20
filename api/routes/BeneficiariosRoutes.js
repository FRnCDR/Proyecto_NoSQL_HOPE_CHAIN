const express = require('express');
const route = express.Router();

const Beneficiario = require('../models/Beneficiario');


// Crear un nuevo beneficiario
route.post('/', async (req, resp) => {
    const { 
        nombre,
        tipoBeneficiario,
        contacto,
        estado
    } = req.body;

    const nuevoBeneficiario = new Beneficiario({
        nombre,
        tipoBeneficiario,
        contacto,
        estado
    });

    try {
        const beneficiarioGuardado = await nuevoBeneficiario.save();
        resp.status(201).json(beneficiarioGuardado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const beneficiarioActualizado = await Beneficiario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!beneficiarioActualizado) {
            return resp.status(404).json({ mesaje: "Beneficiario no encontrado" });
        }

        resp.status(200).json(beneficiarioActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const beneficiarioEliminado = await Beneficiario.findByIdAndDelete(
            req.params.id
        );

        if (!beneficiarioEliminado) {
            return resp.status(404).json({ mesaje: "Beneficiario no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Beneficiario eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todos los beneficiarios
route.get('/', async (req, resp) => {
    try {
        const beneficiariosDatos = await Beneficiario.find();
        resp.json(beneficiariosDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

module.exports = route;
