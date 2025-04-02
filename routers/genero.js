const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero'); // ✅ Importa correctamente el modelo de Género

// 📌 Obtener todos los géneros
router.get('/', (req, res) => {
    Genero.getAll((err, results) => {
        if (err) {
            console.error('❌ Error al obtener los géneros:', err);
            return res.status(500).json({ error: 'Error al obtener los géneros', details: err });
        }
        res.json(results);
    });
});

// 📌 Obtener un género por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`🔍 Buscando género con ID: ${id}`);

    Genero.getById(id, (err, genero) => {
        if (err) {
            console.error('❌ Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor', details: err });
        }

        if (!genero) {
            console.warn(`⚠️ Género con ID ${id} no encontrado.`);
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        console.log(`✅ Género encontrado:`, genero);
        res.json(genero);
    });
});

// 📌 Crear un nuevo género
router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del género es obligatorio' });
    }

    Genero.create(nombre, (err, results) => {
        if (err) {
            console.error('❌ Error al crear el género:', err);
            return res.status(500).json({ error: 'Error al crear el género', details: err });
        }
        console.log('✅ Género creado con éxito, ID:', results.insertId);
        res.json({ message: 'Género creado con éxito', id: results.insertId });
    });
});

// 📌 Actualizar un género por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del género es obligatorio' });
    }

    Genero.update(id, nombre, (err, results) => {
        if (err) {
            console.error('❌ Error al actualizar el género:', err);
            return res.status(500).json({ error: 'Error al actualizar el género', details: err });
        }
        if (results.affectedRows === 0) {
            console.warn(`⚠️ No se encontró un género con ID ${id} para actualizar.`);
            return res.status(404).json({ error: 'Género no encontrado' });
        }
        console.log(`✅ Género con ID ${id} actualizado con éxito.`);
        res.json({ message: 'Género actualizado con éxito' });
    });
});

// 📌 Eliminar un género por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Genero.delete(id, (err, results) => {
        if (err) {
            console.error('❌ Error al eliminar el género:', err);
            return res.status(500).json({ error: 'Error al eliminar el género', details: err });
        }
        if (results.affectedRows === 0) {
            console.warn(`⚠️ No se encontró un género con ID ${id} para eliminar.`);
            return res.status(404).json({ error: 'Género no encontrado' });
        }
        console.log(`✅ Género con ID ${id} eliminado con éxito.`);
        res.json({ message: 'Género eliminado con éxito' });
    });
});

module.exports = router;
