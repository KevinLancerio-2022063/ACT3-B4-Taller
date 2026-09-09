const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {

  // Permitir peticiones desde Angular
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Petición OPTIONS de CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Endpoint para recibir logs del frontend
  if (req.method === 'POST' && req.url === '/log') {

    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {

      try {
        const data = JSON.parse(body);

        console.log('📦 Productos recibidos en el FRONTEND:');
        console.log(data);

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
          mensaje: 'Log recibido correctamente'
        }));

      } catch (error) {

        console.error('❌ Error procesando log:', error);

        res.writeHead(400, {
          'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
          error: 'JSON inválido'
        }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`🟢 Frontend Logger ejecutándose en http://localhost:${PORT}`);
});
