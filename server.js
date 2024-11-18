const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3000;

// Sirve el archivo HTML
app.use(express.static(path.join(__dirname)));

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP en ejecución en http://localhost:${PORT}`);
});

// Configura el servidor WebSocket
const wss = new WebSocket.Server({ server });

// Lista de jugadores conectados
let players = [];

wss.on('connection', (ws) => {
  const playerId = Math.random().toString(36).substr(2, 9);
  console.log(`Jugador conectado: ${playerId}`);
  
  ws.send(JSON.stringify({ type: 'connected', playerId }));

  // Maneja los mensajes entrantes
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch(data.type) {
      case 'join':
        players.push({ id: data.player.id, x: data.player.x, y: data.player.y });
        broadcastGameState();
        break;
      case 'playerUpdate':
        players = players.map(player =>
          player.id === data.player.id ? data.player : player
        );
        broadcastGameState();
        break;
      case 'playerHit':
        players = players.filter(player => player.id !== data.targetId);
        broadcastGameState();
        break;
    }
  });

  // Maneja la desconexión
  ws.on('close', () => {
    console.log(`Jugador desconectado: ${playerId}`);
    players = players.filter(player => player.id !== playerId);
    broadcastGameState();
  });

  // Función para enviar el estado del juego a todos los clientes
  function broadcastGameState() {
    const gameState = JSON.stringify({
      type: 'gameState',
      players: players
    });
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(gameState);
      }
    });
  }
});
