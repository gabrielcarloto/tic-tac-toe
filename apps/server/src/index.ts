import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import humanId from 'human-id';
import IPlayer from './Interfaces/IPlayer';
import IExtendedSocket from './Interfaces/IExtendedSocket';

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.use((s: IExtendedSocket, next) => {
  const socket = s;

  const username = socket.handshake.auth.username as string;

  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.username = username;
  socket.symbol = '';
  return next();
});

io.on('connection', (socket: IExtendedSocket) => {
  socket.on('join room', async (roomID: string | null) => {
    const room = roomID ?? humanId({ separator: '-', capitalize: false });

    await socket.join(room);
    socket.emit('joined', room);

    const roomUsers = await io.in(room).fetchSockets();

    const users: IPlayer[] = [];

    roomUsers.forEach((s) => {
      const user = s as unknown as IExtendedSocket;

      user.symbol = users.length === 0 ? 'X' : 'O';

      users.push({
        userID: user.id,
        username: user.username as string,
        symbol: user.symbol,
      });
    });

    socket.emit('users', users);

    socket.broadcast.to(room).emit('user connected', {
      userID: socket.id,
      username: socket.username,
      symbol: socket.symbol,
    });

    socket.on('cell clicked', (clickedCellIndex: number) => {
      socket.broadcast.to(room).emit('cell clicked', clickedCellIndex);
    });

    socket.on('restart game', () => {
      socket.broadcast.to(room).emit('restart game');
    });

    socket.on('disconnect', () => {
      socket.broadcast.to(room).emit('player disconnected');
    });
  });
});

server.listen(3333);
