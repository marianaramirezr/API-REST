const express = require('express');
const cors = require('cors');
const db = require('./db/connect-mysql'); // ✅ Conexión a MySQL

const app = express();
const port = 4000;

// 📌 Middleware
app.use(cors());
app.use(express.json());

// 📌 Importar rutas
const generoRouter = require('./routers/genero');
const directorRouter = require('./routers/director');
const mediaRouter = require('./routers/media');
const productoraRouter = require('./routers/productora');
const tipoRouter = require('./routers/tipo');

// 📌 Registrar rutas en Express
app.use('/generos', generoRouter);
app.use('/directores', directorRouter);
app.use('/media', mediaRouter);
app.use('/productoras', productoraRouter);
app.use('/tipos', tipoRouter);

// 📌 Ruta raíz para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ message: '✅ API REST funcionando correctamente 🎬' });
});

// 📌 Ruta para actualizar una película (PUT /media/:id)
app.put('/media/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, sinopsis, anio, imagen, director_id, genero_id, productora_id, tipo_id } = req.body;

    // Verificar que los campos requeridos no estén vacíos
    if (!titulo || !sinopsis || !anio || !imagen || !director_id || !genero_id || !productora_id || !tipo_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        UPDATE media 
        SET titulo = ?, sinopsis = ?, anio = ?, imagen = ?, director_id = ?, genero_id = ?, productora_id = ?, tipo_id = ? 
        WHERE id = ?
    `;
    const values = [titulo, sinopsis, anio, imagen, director_id, genero_id, productora_id, tipo_id, id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('❌ Error al actualizar la película:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        res.json({ message: '✅ Película actualizada correctamente' });
    });
});

// 📌 Manejo de rutas no encontradas (404)
app.use((req, res) => {
    console.warn('⚠️ Ruta no encontrada:', req.originalUrl);
    res.status(404).json({ error: '404 Not Found', message: 'Recurso no encontrado 😐' });
});

// 📌 Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('❌ Error en el servidor:', err);
    res.status(500).json({ error: '500 Internal Server Error', message: 'Algo salió mal en el servidor.' });
});

// 📌 Iniciar servidor con verificación de conexión a MySQL
db.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err);
        process.exit(1); // Detiene la ejecución si no puede conectar
    }
    console.log('✅ Conexión a MySQL establecida correctamente');
     
    // Iniciar el servidor después de verificar la conexión
    app.listen(port, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
});