const connection = require('../db/connect-mysql');

const Media = {
    getAll: (callback) => {
        connection.query('SELECT * FROM media', callback);
    },
    create: ({ titulo, sinopsis, genero_id, director_id, productora_id, tipo_id }, callback) => {
        connection.query(
            'INSERT INTO media (titulo, sinopsis, genero_id, director_id, productora_id, tipo_id) VALUES (?, ?, ?, ?, ?, ?)',
            [titulo, sinopsis, genero_id, director_id, productora_id, tipo_id],
            callback
        );
    }
};

module.exports = Media;
