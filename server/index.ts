import http from 'http';
import express from 'express';
import socketio, { Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

interface ExtendedSocket extends Socket {
  username?: string;
  symbol?: string;
}

io.use((socket: ExtendedSocket, next) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.username = username;
  socket.symbol = '';
  next();
});

io.on('connection', (socket: ExtendedSocket) => {
  const users = [];

  for (let [id, socket] of io.of('/').sockets) {
    (socket as ExtendedSocket).symbol = users.length === 0 ? 'X' : 'O';

    users.push({
      userID: id,
      username: (socket as ExtendedSocket).username,
      symbol: (socket as ExtendedSocket).symbol,
    });
  }

  socket.emit('users', users);

  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
    symbol: socket.symbol,
  });

  socket.on('cell clicked', (clickedCellIndex) => {
    socket.broadcast.emit('cell clicked', clickedCellIndex);
  });

  socket.on('restart game', () => {
    socket.broadcast.emit('restart game');
  });
});

server.listen(3333);
