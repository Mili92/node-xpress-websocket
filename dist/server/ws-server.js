"use strict";
/**
 * @name we-server Instanciation d'un server websocket
 * sur un server HTTP
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Importation des packages nécessaires
const express = require("express"); //Framework NodeJS
const http = require("http"); // Module server HTTP
const WebSocket = require("ws"); //Module server WebSocket
//Initialisation of a new application Express
const app = express();
//Initialise a new HTTP server (client communication support)
const server = http.createServer(app);
//Initialise a WebSocket instance
const wss = new WebSocket.Server({ server }); //websocket server: wss
//Le server WebSocket écoute certains évènements...
wss.on('connection', (ws) => {
    //La connexion est okay, on envoie un simple message
    ws.on('message', (message) => {
        //Affiche le message dans la onsole et retourne au client
        console.log('Reçu: %s', message);
        ws.send(`Hello, vous venez d\'envoyer -> ${message}`);
    });
    //Envoie immédiatement une information au client connecté
    ws.send('Salut, je suis le serveur WebSocket');
});
//Démarre le serveur
server.listen(process.env.PORT || 8999, () => {
    console.log('Le server est démarré sur l\'adresse :' + server.address());
});
//# sourceMappingURL=ws-server.js.map