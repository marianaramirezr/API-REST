const connection = require('../db/connect-mysql');

const Tipo = {
    // Obtener todos los tipos
    getAll: (callback) => {
        connection.query('SELECT * FROM tipos', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Crear un nuevo tipo
    create: (nombre, callback) => {
        connection.query('INSERT INTO tipos (nombre) VALUES (?)', [nombre], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Actualizar un tipo por ID
    update: (id, nombre, callback) => {
        connection.query('UPDATE tipos SET nombre = ? WHERE id = ?', [nombre, id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Eliminar un tipo por ID
    delete: (id, callback) => {
        connection.query('DELETE FROM tipos WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Tipo;