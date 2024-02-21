const http = require('http');
const fs = require('fs');
const path = require('path');

const requestHandler = (request, response) => {
  console.log('Requête reçue.');

  const url = request.url;
  const filePath = url === '/' ? 'index.html' : url; // Chemin local pour les fichiers du projet

  if (filePath.endsWith('.html') || filePath.endsWith('.css') || filePath.endsWith('.js')) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404);
        response.end('404 Not Found');
      } else {
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) {
          contentType = 'text/css';
        } else if (filePath.endsWith('.js')) {
          contentType = 'text/javascript';
        }
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
      }
    });
  } else if (filePath === '/citations.json') {
    const jsonPath = path.join(__dirname, 'citations.json');
    fs.readFile(jsonPath, (err, data) => {
      if (err) {
        response.writeHead(404);
        response.end('404 Not Found');
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(data);
      }
    });
  } else {
    response.writeHead(404);
    response.end('404 Not Found');
  }
};

const server = http.createServer(requestHandler);

server.listen(3000, (err) => {
  if (err) {
    return console.error('Impossible de démarrer le serveur :', err);
  }
  console.log('Serveur démarré sur le port 3000');
});
