const express = require('express');
const fs = require('fs-extra');
const cors = require('cors'); // Middleware para CORS

const app = express();
const PORT = 3000;

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Middleware para parsear JSON

// Ruta GET para obtener mensajes
app.get('/api/messages', async (req, res) => {
    try {
        const data = await fs.readJson('src/data.json');
        res.json(data.messages);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo JSON' });
    }
});

// Ruta POST para añadir un mensaje
app.post('/api/messages', async (req, res) => {
    const { contenido } = req.body;

    if (!contenido) {
        return res.status(400).json({ error: 'Se requiere contenido en el mensaje' });
    }

    const nuevoMensaje = {
        contenido,
        fecha: new Date().toLocaleString()
    };

    try {
        const data = await fs.readJson('src/data.json');
        data.messages.push(nuevoMensaje);
        await fs.writeJson('src/data.json', data);
        res.status(201).json({ message: 'Mensaje añadido' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en el archivo JSON' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
