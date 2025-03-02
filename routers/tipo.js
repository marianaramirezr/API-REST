const express = require('express');
const router = express.Router();
const Tipo = require('../models/Tipo'); 

router.get('/', (req, res) => {
    Tipo.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre } = req.body;

    
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    Tipo.create({ nombre }, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Tipo creado', id: results.insertId });
    });
});

module.exports = router; 