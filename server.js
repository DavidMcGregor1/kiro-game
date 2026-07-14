const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// In-memory player state (no DB needed)
const players = {};

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  // Player joins with a name
  socket.on('playerJoin', (name) => {
    players[socket.id] = {
      id: socket.id,
      name: name || 'Ghost',
      x: 60,
      y: 520,
      level: 1,
      flipX: false,
      alive: true
    };
    // Send current players to the new player
    socket.emit('currentPlayers', players);
    // Notify others of new player
    socket.broadcast.emit('playerJoined', players[socket.id]);
  });

  // Player position update
  socket.on('playerMove', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      players[socket.id].level = data.level;
      players[socket.id].flipX = data.flipX;
      players[socket.id].alive = data.alive;
      // Broadcast to all other players
      socket.broadcast.emit('playerMoved', players[socket.id]);
    }
  });

  // Player died
  socket.on('playerDied', () => {
    if (players[socket.id]) {
      players[socket.id].alive = false;
      socket.broadcast.emit('playerDied', socket.id);
    }
  });

  // Player restarted
  socket.on('playerRestart', () => {
    if (players[socket.id]) {
      players[socket.id].alive = true;
      players[socket.id].level = 1;
      players[socket.id].x = 60;
      players[socket.id].y = 520;
      socket.broadcast.emit('playerRestarted', players[socket.id]);
    }
  });

  // Player level change
  socket.on('playerLevelChange', (level) => {
    if (players[socket.id]) {
      players[socket.id].level = level;
      socket.broadcast.emit('playerLevelChanged', { id: socket.id, level: level });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    delete players[socket.id];
    io.emit('playerLeft', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Kiro Bug Dodge server running on port ${PORT}`);
});
