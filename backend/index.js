const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Game state
const games = new Map(); // Store game rooms
const players = new Map(); // Store player socket IDs

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-game', (roomId) => {
    // Handle empty strings and null/undefined
    const trimmedRoomId = roomId ? roomId.trim() : null;
    
    // Check if player is already in a game
    const existingPlayer = players.get(socket.id);
    if (existingPlayer) {
      // Leave existing room
      socket.leave(existingPlayer.roomId);
      const existingGame = games.get(existingPlayer.roomId);
      if (existingGame) {
        const index = existingGame.players.indexOf(socket.id);
        if (index > -1) {
          existingGame.players.splice(index, 1);
        }
        if (existingGame.players.length === 0) {
          games.delete(existingPlayer.roomId);
        } else {
          socket.to(existingPlayer.roomId).emit('opponent-left');
        }
      }
      players.delete(socket.id);
    }

    if (!trimmedRoomId || trimmedRoomId === '') {
      // Create new game
      const newRoomId = `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      socket.join(newRoomId);
      games.set(newRoomId, {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        players: [socket.id],
        status: 'waiting'
      });
      players.set(socket.id, { roomId: newRoomId, symbol: 'X' });
      socket.emit('game-joined', { roomId: newRoomId, symbol: 'X', isYourTurn: true });
      console.log(`Player ${socket.id} created room ${newRoomId}`);
    } else {
      // Join existing game
      const game = games.get(trimmedRoomId);
      if (game && game.players.length === 1 && game.status === 'waiting') {
        socket.join(trimmedRoomId);
        game.players.push(socket.id);
        game.status = 'playing';
        players.set(socket.id, { roomId: trimmedRoomId, symbol: 'O' });
        socket.emit('game-joined', { roomId: trimmedRoomId, symbol: 'O', isYourTurn: false });
        socket.to(trimmedRoomId).emit('opponent-joined', { symbol: 'X', isYourTurn: true });
        io.to(trimmedRoomId).emit('game-start', { currentPlayer: 'X' });
        console.log(`Player ${socket.id} joined room ${trimmedRoomId}`);
      } else if (game && game.players.length >= 2) {
        socket.emit('join-error', { message: 'Room is full. Please create a new game or join a different room.' });
      } else {
        socket.emit('join-error', { message: 'Room does not exist. Please check the Room ID or create a new game.' });
      }
    }
  });

  socket.on('make-move', (data) => {
    const { roomId, cellIndex } = data;
    const game = games.get(roomId);
    const player = players.get(socket.id);

    if (!game || !player || player.roomId !== roomId) {
      socket.emit('move-error', { message: 'Invalid move' });
      return;
    }

    if (game.status !== 'playing') {
      socket.emit('move-error', { message: 'Game is not in progress' });
      return;
    }

    if (game.currentPlayer !== player.symbol) {
      socket.emit('move-error', { message: 'Not your turn' });
      return;
    }

    if (game.board[cellIndex] !== null) {
      socket.emit('move-error', { message: 'Cell already occupied' });
      return;
    }

    // Make the move
    game.board[cellIndex] = player.symbol;
    
    // Check for winner
    const winner = checkWinner(game.board);
    if (winner) {
      game.status = 'finished';
      game.winner = winner;
      io.to(roomId).emit('game-over', { winner, board: game.board });
    } else if (game.board.every(cell => cell !== null)) {
      // Draw
      game.status = 'finished';
      game.winner = 'draw';
      io.to(roomId).emit('game-over', { winner: 'draw', board: game.board });
    } else {
      // Switch turns
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
      io.to(roomId).emit('move-made', {
        cellIndex,
        symbol: player.symbol,
        currentPlayer: game.currentPlayer,
        board: game.board
      });
    }
  });

  socket.on('reset-game', (roomId) => {
    const game = games.get(roomId);
    if (game) {
      game.board = Array(9).fill(null);
      game.currentPlayer = 'X';
      game.status = 'playing';
      game.winner = null;
      io.to(roomId).emit('game-reset', { currentPlayer: 'X' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const player = players.get(socket.id);
    if (player) {
      const game = games.get(player.roomId);
      if (game) {
        const index = game.players.indexOf(socket.id);
        if (index > -1) {
          game.players.splice(index, 1);
        }
        if (game.players.length === 0) {
          games.delete(player.roomId);
        } else {
          socket.to(player.roomId).emit('opponent-left');
        }
      }
      players.delete(socket.id);
    }
  });
});

// Helper function to check for winner
function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`XO Game Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
