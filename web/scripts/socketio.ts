import { io } from 'socket.io-client';

const socket = io('http://localhost:3333', { autoConnect: false });

socket.on('connect_error', (err: Error) => {
  console.log(err);
});

export { socket };
