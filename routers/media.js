const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// 📌 Crear película con imagen por URL
router.post('/', async (req, res) => {
    try {
        console.log("📥 Datos recibidos en POST /media:", req.body);
        const { titulo, imagen, director_id, genero_id, productora_id, tipo_id } = req.body;

        if (!titulo || !imagen || isNaN(director_id) || isNaN(genero_id) || isNaN(productora_id) || isNaN(tipo_id)) {
            return res.status(400).json({ error: "Todos los campos son obligatorios y deben ser números válidos" });
        }

        const newMovie = await Media.create({
            titulo,
            imagen,
            director_id: parseInt(director_id),
            genero_id: parseInt(genero_id),
            productora_id: parseInt(productora_id),
            tipo_id: parseInt(tipo_id)
        });

        res.status(201).json(newMovie);
    } catch (error) {
        console.error("❌ Error al insertar película:", error);
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener todas las películas (CORREGIDO)
router.get('/', async (req, res) => {
    try {
        const peliculas = await Media.getAll(); // ✅ Se usa getAll() en lugar de findAll()
        res.json(peliculas);
    } catch (error) {
        console.error("❌ Error al obtener películas:", error);
        res.status(500).json({ error: error.message });
    }
});

// 📌 Obtener una película por ID (CORREGIDO)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

        const pelicula = await Media.getById(id); // ✅ Se usa getById() en lugar de findByPk()
        if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });

        res.json(pelicula);
    } catch (error) {
        console.error("❌ Error al buscar película:", error);
        res.status(500).json({ error: error.message });
    }
});

// 📌 Actualizar una película/serie por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, imagen, director_id, genero_id, productora_id, tipo_id } = req.body;

        if (isNaN(id) || !titulo || !imagen || isNaN(director_id) || isNaN(genero_id) || isNaN(productora_id) || isNaN(tipo_id)) {
            return res.status(400).json({ error: "Todos los campos son obligatorios y deben ser números válidos" });
        }

        const result = await Media.update(id, {
            titulo,
            imagen,
            director_id: parseInt(director_id),
            genero_id: parseInt(genero_id),
            productora_id: parseInt(productora_id),
            tipo_id: parseInt(tipo_id)
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        res.json({ message: 'Película actualizada con éxito' });
    } catch (error) {
        console.error("❌ Error al actualizar película:", error);
        res.status(500).json({ error: error.message });
    }
});

// 📌 Eliminar una película/serie por ID (CORREGIDO)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

        const result = await Media.delete(id); // ✅ Se usa delete() en lugar de findByPk() y destroy()
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        res.json({ message: 'Película eliminada con éxito' });
    } catch (error) {
        console.error("❌ Error al eliminar película:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
