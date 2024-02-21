
const http = require('http');


const requestHandler = (request, response) => {
  console.log('Requête reçue.');
  response.end('Hello, world!');
};


const server = http.createServer(requestHandler);


server.listen(3000, (err) => {
  if (err) {
    return console.error('Impossible de démarrer le serveur :', err);
  }
  console.log('Serveur démarré sur le port 3000');
});
