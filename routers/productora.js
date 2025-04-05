const express = require('express');
const router = express.Router();
const Productora = require('../models/Productora');

// 📌 Obtener todas las productoras
router.get('/', (req, res) => {
    Productora.getAll((err, results) => {
        if (err) {
            console.error('❌ Error al obtener las productoras:', err);
            return res.status(500).json({ error: 'Error al obtener las productoras', details: err });
        }
        res.json(results);
    });
});

// 📌 Obtener una productora por ID (corregido)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`🔍 Buscando productora con ID: ${id}`);

    Productora.getById(id, (err, productora) => {
        if (err) {
            console.error('❌ Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor', details: err });
        }

        if (!productora) {
            console.warn(`⚠️ Productora con ID ${id} no encontrada.`);
            return res.status(404).json({ error: 'Productora no encontrada' });
        }

        console.log(`✅ Productora encontrada:`, productora);
        res.json(productora);
    });
});

// 📌 Crear una nueva productora
router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre de la productora es obligatorio' });
    }

    Productora.create(nombre, (err, results) => {
        if (err) {
            console.error('❌ Error al crear la productora:', err);
            return res.status(500).json({ error: 'Error al crear la productora', details: err });
        }
        console.log('✅ Productora creada con éxito, ID:', results.insertId);
        res.json({ message: 'Productora creada con éxito', id: results.insertId });
    });
});

// 📌 Actualizar una productora por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre de la productora es obligatorio' });
    }

    Productora.update(id, nombre, (err, results) => {
        if (err) {
            console.error('❌ Error al actualizar la productora:', err);
            return res.status(500).json({ error: 'Error al actualizar la productora', details: err });
        }
        if (results.affectedRows === 0) {
            console.warn(`⚠️ No se encontró una productora con ID ${id} para actualizar.`);
            return res.status(404).json({ error: 'Productora no encontrada' });
        }
        console.log(`✅ Productora con ID ${id} actualizada con éxito.`);
        res.json({ message: 'Productora actualizada con éxito' });
    });
});

// 📌 Eliminar una productora por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Productora.delete(id, (err, results) => {
        if (err) {
            console.error('❌ Error al eliminar la productora:', err);
            return res.status(500).json({ error: 'Error al eliminar la productora', details: err });
        }
        if (results.affectedRows === 0) {
            console.warn(`⚠️ No se encontró una productora con ID ${id} para eliminar.`);
            return res.status(404).json({ error: 'Productora no encontrada' });
        }
        console.log(`✅ Productora con ID ${id} eliminada con éxito.`);
        res.json({ message: 'Productora eliminada con éxito' });
    });
});

module.exports = router;