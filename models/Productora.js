const connection = require('../db/connect-mysql'); 

const Productora = {
    getAll: (callback) => {
        connection.query('SELECT * FROM productoras', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    create: (nombre, callback) => {
        connection.query('INSERT INTO productoras (nombre) VALUES (?)', [nombre], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Productora;
