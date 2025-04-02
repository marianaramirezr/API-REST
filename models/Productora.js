const connection = require('../db/connect-mysql');

const Productora = {
    // Obtener todas las productoras
    getAll: (callback) => {
        connection.query('SELECT * FROM productoras', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        connection.query('SELECT * FROM productoras WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null); // No encontrado
            callback(null, results[0]); // ✅ Devuelve el primer resultado
        });
    },

    // Crear una nueva productora
    create: (nombre, callback) => {
        connection.query('INSERT INTO productoras (nombre) VALUES (?)', [nombre], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Actualizar una productora por ID
    update: (id, nombre, callback) => {
        connection.query('UPDATE productoras SET nombre = ? WHERE id = ?', [nombre, id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Eliminar una productora por ID
    delete: (id, callback) => {
        connection.query('DELETE FROM productoras WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Productora;
