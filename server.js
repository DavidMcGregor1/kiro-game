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

// In-memory leaderboard (competitive mode only)
const leaderboard = [];

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  // Player joins with a name
  socket.on('playerJoin', (data) => {
    const name = (typeof data === 'string') ? data : (data.name || 'Ghost');
    const color = (typeof data === 'object') ? (data.color || 0x9b59b6) : 0x9b59b6;
    players[socket.id] = {
      id: socket.id,
      name: name,
      color: color,
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

  // Submit time (competitive mode only)
  socket.on('submitTime', (data) => {
    if (data && data.name && typeof data.time === 'number') {
      leaderboard.push({
        name: data.name,
        time: data.time,
        color: data.color || 0x9b59b6,
        date: Date.now()
      });
      // Sort by fastest time
      leaderboard.sort((a, b) => a.time - b.time);
      // Keep top 50 entries
      if (leaderboard.length > 50) {
        leaderboard.length = 50;
      }
      console.log('Leaderboard entry:', data.name, data.time + 's');
    }
  });

  // Get leaderboard
  socket.on('getLeaderboard', () => {
    socket.emit('leaderboard', leaderboard);
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
  console.log(`KIRO - Route To Prod server running on port ${PORT}`);
});
