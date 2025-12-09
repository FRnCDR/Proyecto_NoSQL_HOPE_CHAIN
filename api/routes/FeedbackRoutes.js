const express = require('express');
const route = express.Router();

const Feedback = require('../models/Feedback');


// Crear un nuevo feedback
route.post('/', async (req, resp) => {
    const { 
        autor,
        mensaje,
        calificacion,
        estado
    } = req.body;

    const nuevoFeedback = new Feedback({
        autor,
        mensaje,
        calificacion,
        estado
    });

    try {
        const feedbackGuardado = await nuevoFeedback.save();
        resp.status(201).json(feedbackGuardado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const feedbackActualizado = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!feedbackActualizado) {
            return resp.status(404).json({ mesaje: "Feedback no encontrado" });
        }

        resp.status(200).json(feedbackActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const feedbackEliminado = await Feedback.findByIdAndDelete(
            req.params.id
        );

        if (!feedbackEliminado) {
            return resp.status(404).json({ mesaje: "Feedback no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Feedback eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});


// Obtener todos los feedbacks
route.get('/', async (req, resp) => {
    try {
        const feedbackDatos = await Feedback.find();
        resp.json(feedbackDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});


// Obtener un feedback por ID 
route.get('/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return resp.status(404).json({ mesaje: 'Feedback no encontrado' });
        }

        resp.json(feedback);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});


module.exports = route;