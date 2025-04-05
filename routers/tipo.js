const express = require('express');
const router = express.Router();
const Tipo = require('../models/Tipo');

// Obtener todos los tipos
router.get('/', (req, res) => {
    Tipo.getAll((err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los tipos', details: err });
        res.json(results);
    });
});

// Crear un nuevo tipo
router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del tipo es obligatorio' });
    }

    Tipo.create(nombre, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al crear el tipo', details: err });
        res.json({ message: 'Tipo creado con éxito', id: results.insertId });
    });
});

// Actualizar un tipo por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del tipo es obligatorio' });
    }

    Tipo.update(id, nombre, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el tipo', details: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Tipo no encontrado' });
        }
        res.json({ message: 'Tipo actualizado con éxito' });
    });
});

// Eliminar un tipo por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Tipo.delete(id, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el tipo', details: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Tipo no encontrado' });
        }
        res.json({ message: 'Tipo eliminado con éxito' });
    });
});

module.exports = router;