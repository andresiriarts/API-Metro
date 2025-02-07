const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Ruta para manejar la solicitud a la API externa
app.get('/api/data', (req, res) => {
  const url = 'https://www.metro.cl/api/estadoRedDetalle.php';  // Aquí pones la URL de la API que deseas consumir

  https.get(url, (apiRes) => {
    let data = '';

    // A medida que se recibe la respuesta, la almacenamos
    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    // Cuando termina la solicitud, respondemos con los datos obtenidos
    apiRes.on('end', () => {
      res.json(JSON.parse(data));  // Enviamos los datos como respuesta JSON
    });

  }).on('error', (err) => {
    res.status(500).json({ error: 'Error en la solicitud a la API' });
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
