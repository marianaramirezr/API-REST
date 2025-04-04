const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false // ❌ Deshabilitar SSL para Railway
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err);
        process.exit(1);
    }
    console.log('✅ Conexión a MySQL establecida correctamente 🚀');
});

module.exports = db;
