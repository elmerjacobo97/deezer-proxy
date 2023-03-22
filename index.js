const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
app.options('*', cors());

// Configuración de las cabeceras CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

// Ruta para buscar en Deezer
app.get('/search', async (req, res) => {
    try {
        const query = req.query.q; // Obtener el parámetro "q" de la URL
        const url = `https://api.deezer.com/search?q=${query}&limit=100`;
        const { data } = await axios.get(url);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar en Deezer' });
    }
});

// Endpoint para buscar álbumes por título
app.get('/search/album', async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const response = await axios.get(`https://api.deezer.com/search/album?q=${searchTerm}`);
        const data = response.data;

        if (data.total === 0) {
            return res.status(404).send('No se encontraron resultados para la búsqueda');
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al buscar el álbum');
    }
});

app.get('/search/artist', async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const response = await axios.get(
            `https://api.deezer.com/search/artist?q=${searchTerm}&limit=100`
        );
        const data = response.data;

        if (data.total === 0) {
            return res.status(404).send('No se encontraron resultados para la búsqueda');
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al buscar el álbum');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
