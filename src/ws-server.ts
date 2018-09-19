/**
 * @name we-server Instanciation d'un server websocket
 * sur un server HTTP
 */

 // Importation des packages nécessaires
 import * as express from 'express'; //Framework NodeJS
 import * as http from 'http'; // Module server HTTP
 import * as WebSocket from 'ws'; //Module server WebSocket

 //Initialisation of a new application Express
 const app = express();

 //Initialise a new HTTP server (client communication support)
 const server = http.createServer(app);

 //Initialise a WebSocket instance
 const wss = new WebSocket.Server({ server }); //websocket server: wss

 //Le server WebSocket écoute certains évènements...
 wss.on('connection',(ws:WebSocket)=>{

    //La connexion est okay, on envoie un simple message
    ws.on('message',(message: string)=>{

        //Affiche le message dans la onsole et retourne au client
        console.log('Reçu: %s',message);
        ws.send(`Hello, vous venez d\'envoyer -> ${message}`);
    });

    //Envoie immédiatement une information au client connecté
    ws.send('Salut, je suis le serveur WebSocket');
 });

 //Démarre le serveur
 server.listen(process.env.PORT || 8999, () => {
     console.log('Le server est démarré sur l\'adresse :' + server.address());
 });
