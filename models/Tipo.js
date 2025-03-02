const connection = require('../db/connect-mysql');

const Tipo = {
    getAll: (callback) => {
        connection.query('SELECT * FROM tipos', callback);
    },
    create: (nombre, callback) => {
        connection.query('INSERT INTO tipos (nombre) VALUES (?)', [nombre], callback);
    }
};

module.exports = Tipo;
