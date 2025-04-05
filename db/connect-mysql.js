const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306 // Usa 3306 por defecto si no está definido
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err);
        process.exit(1);
    }
    console.log('✅ Conexión a MySQL establecida');
});

module.exports = db;
