const connection = require('../db/connect-mysql');
const util = require('util');

// Convertimos connection.query en una función basada en promesas
const query = util.promisify(connection.query).bind(connection);

const Media = {
    getAll: async () => {
        try {
            return await query('SELECT * FROM media');
        } catch (err) {
            console.error("❌ Error al obtener todas las películas:", err);
            throw err;
        }
    },

    getById: async (id) => {
        try {
            const results = await query('SELECT * FROM media WHERE id = ?', [id]);
            return results[0]; // Retornar el primer resultado
        } catch (err) {
            console.error("❌ Error al obtener la película por ID:", err);
            throw err;
        }
    },

    create: async (newMedia) => {
        try {
            const result = await query('INSERT INTO media SET ?', newMedia);
            return { id: result.insertId, ...newMedia };
        } catch (err) {
            console.error("❌ Error al crear una nueva película:", err);
            throw err;
        }
    },

    update: async (id, updatedMedia) => {
        try {
            const result = await query('UPDATE media SET ? WHERE id = ?', [updatedMedia, id]);
            return result;
        } catch (err) {
            console.error("❌ Error al actualizar la película:", err);
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const result = await query('DELETE FROM media WHERE id = ?', [id]);
            return result;
        } catch (err) {
            console.error("❌ Error al eliminar la película:", err);
            throw err;
        }
    }
};

module.exports = Media;