const connection = require('../db/connect-mysql'); // ✅ Importamos la conexión a MySQL

const Director = {
    getAll: (callback) => {
        connection.query('SELECT * FROM directores', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    create: (nombre, callback) => {
        connection.query('INSERT INTO directores (nombre) VALUES (?)', [nombre], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Director;
