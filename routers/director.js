const express = require('express');
const router = express.Router();
const Director = require('../models/Director'); // ✅ Importa el modelo correctamente

// 📌 Obtener todos los directores
router.get('/', (req, res) => {
    Director.getAll((err, results) => {
        if (err) {
            console.error('❌ Error al obtener los directores:', err);
            return res.status(500).json({ error: 'Error al obtener los directores', details: err });
        }
        res.json(results);
    });
});

// 📌 Obtener un director por ID (con logs para depuración)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`🔍 Buscando director con ID: ${id}`); // 👀 Log para verificar la entrada

    Director.getById(id, (err, director) => {
        if (err) {
            console.error('❌ Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor', details: err });
        }

        if (!director) {
            console.warn(`⚠️ Director con ID ${id} no encontrado.`);
            return res.status(404).json({ error: 'Director no encontrado' });
        }

        console.log(`✅ Director encontrado:`, director);
        res.json(director);
    });
});

// 📌 Crear un nuevo director
router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del director es obligatorio' });
    }

    Director.create(nombre, (err, results) => {
        if (err) {
            console.error('❌ Error al crear el director:', err);
            return res.status(500).json({ error: 'Error al crear el director', details: err });
        }
        console.log('✅ Director creado con éxito, ID:', results.insertId);
        res.json({ message: 'Director creado con éxito', id: results.insertId });
    });
});

// 📌 Actualizar un director por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del director es obligatorio' });
    }

    Director.update(id, nombre, (err, results) => {
        if (err) {
            console.error('❌ Error al actualizar el director:', err);
            return res.status(500).json({ error: 'Error al actualizar el director', details: err });
        }
        if (results.affectedRows === 0) {
            console.warn(`⚠️ No se encontró un director con ID ${id} para actualizar.`);
            return res.status(404).json({ error: 'Director no encontrado' });
        }
        console.log(`✅ Director con ID ${id} actualizado con éxito.`);
        res.json({ message: 'Director actualizado con éxito' });
    });
});

// 📌 Eliminar un director por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Director.delete(id, (err, results) => {
        if (err) {
            console.error('❌ Error al eliminar el director:', err);
            return res.status(500).json({ error: 'Error al eliminar el director', details: err });
        }
        if (results.affectedRows === 0) {
            console.warn(`⚠️ No se encontró un director con ID ${id} para eliminar.`);
            return res.status(404).json({ error: 'Director no encontrado' });
        }
        console.log(`✅ Director con ID ${id} eliminado con éxito.`);
        res.json({ message: 'Director eliminado con éxito' });
    });
});

module.exports = router;