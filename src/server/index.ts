import http from 'http';
import path from 'path';
import express from 'express';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'public'));
app.use(express.static(path.resolve(__dirname, '../..', 'dist')));

io.on('connection', (socket) => {
  console.log(socket.id);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/play', (req, res) => {
  res.render('play');
});

server.listen(3333);
