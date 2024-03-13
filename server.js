const http = require('http');
const fs = require('fs');
const path = require('path');

const requestHandler = (request, response) => {
    console.log('Requête reçue.');

    const url = request.url;
    let filePath = '.' + url;
    if (filePath === './') {
        filePath = './citation.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json'
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404);
            response.end('404 Not Found');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data, 'utf-8');
        }
    });
};

const server = http.createServer(requestHandler);

server.listen(3000, (err) => {
    if (err) {
        return console.error('Impossible de démarrer le serveur :', err);
    }
    console.log('Serveur démarré sur le port 3000');
});



