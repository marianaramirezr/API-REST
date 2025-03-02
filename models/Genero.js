const connection = require('../db/connect-mysql');

const Genero = {
    getAll: (callback) => {
        connection.query('SELECT * FROM generos', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    create: (nombre, callback) => {
        connection.query('INSERT INTO generos (nombre) VALUES (?)', [nombre], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Genero;
