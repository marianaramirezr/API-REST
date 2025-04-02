const connection = require('../db/connect-mysql'); 

const Director = {
    // Obtener todos los directores
    getAll: (callback) => {
        connection.query('SELECT * FROM directores', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Obtener un director por ID
    getById: (id, callback) => {
        connection.query('SELECT * FROM directores WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null); // No encontrado
            callback(null, results[0]); // ✅ Devuelve el primer resultado
        });
    },

    // Crear un nuevo director
    create: (nombre, callback) => {
        connection.query('INSERT INTO directores (nombre) VALUES (?)', [nombre], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Actualizar un director por ID
    update: (id, nombre, callback) => {
        connection.query('UPDATE directores SET nombre = ? WHERE id = ?', [nombre, id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Eliminar un director por ID
    delete: (id, callback) => {
        connection.query('DELETE FROM directores WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Director;
