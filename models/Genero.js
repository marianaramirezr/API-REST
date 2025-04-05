const connection = require('../db/connect-mysql');

const Genero = {
    // Obtener todos los géneros
    getAll: (callback) => {
        connection.query('SELECT * FROM generos', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Obtener un genero por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM generos WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null); // No encontrado
            callback(null, results[0]); // ✅ Devuelve el primer resultado
        });
    },

    // Crear un nuevo género
    create: (nombre, callback) => {
        connection.query('INSERT INTO generos (nombre) VALUES (?)', [nombre], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Actualizar un género por ID
    update: (id, nombre, callback) => {
        connection.query('UPDATE generos SET nombre = ? WHERE id = ?', [nombre, id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Eliminar un género por ID
    delete: (id, callback) => {
        connection.query('DELETE FROM generos WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Genero;