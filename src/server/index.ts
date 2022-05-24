import http from 'http';
import path from 'path';
import express from 'express';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

io.on('connection', (socket) => {
  console.log(socket.id);
});

server.listen(3333);
