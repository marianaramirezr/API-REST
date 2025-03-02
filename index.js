const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const generoRouter = require('./routers/genero');  
const directorRouter = require('./routers/director');
const mediaRouter = require('./routers/media');
const productoraRouter = require('./routers/productora');
const tipoRouter = require('./routers/tipo');

app.use('/generos', generoRouter);
app.use('/directores', directorRouter);
app.use('/media', mediaRouter);
app.use('/productoras', productoraRouter);
app.use('/tipos', tipoRouter);

app.get('/', (req, res) => {
    res.send('API REST funcionando correctamente 🎬');
});

app.use((req, res) => {
    res.status(404).send('404 Not Found\nRequested resource could not be found. 😐');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
