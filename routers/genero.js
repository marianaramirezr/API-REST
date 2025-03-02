const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero');  // ✅ Asegurar que el modelo está correctamente importado

router.get('/', (req, res) => {
    Genero.getAll((err, results) => {
        if (err) {
            console.error('❌ Error obteniendo géneros:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre del género es obligatorio' });
    }

    Genero.create(nombre, (err, results) => {
        if (err) {
            console.error('❌ Error insertando género:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Género creado exitosamente', id: results.insertId });
    });
});

module.exports = router;
