const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

router.get('/', (req, res) => {
    Media.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre, tipo, director_id, genero_id, productora_id } = req.body;


    if (!nombre || !tipo || !director_id || !genero_id || !productora_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    Media.create({ nombre, tipo, director_id, genero_id, productora_id }, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Media creada', id: results.insertId }); 
    });
});

module.exports = router;  