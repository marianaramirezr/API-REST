const express = require('express');
const router = express.Router();
const Director = require('../models/Director'); 

router.get('/', (req, res) => {
    Director.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del director es obligatorio' });
    }

    Director.create(nombre, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Director creado', id: results.insertId }); 
    });
});

module.exports = router;
