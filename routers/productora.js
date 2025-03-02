const express = require('express');
const router = express.Router();
const Productora = require('../models/Productora'); 


router.get('/', (req, res) => {
    Productora.getAll((err, results) => {
        if (err) {
            console.error('❌ Error obteniendo productoras:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { nombre } = req.body;


    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre de la productora es obligatorio' });
    }

    Productora.create(nombre, (err, results) => {  
        if (err) {
            console.error('❌ Error insertando productora:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Productora creada exitosamente', id: results.insertId });
    });
});

module.exports = router;
