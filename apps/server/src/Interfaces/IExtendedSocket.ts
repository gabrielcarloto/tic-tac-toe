import { Socket } from 'socket.io';

export default interface ExtendedSocket extends Socket {
  username?: string;
  symbol?: string;
  room?: string | null;
}
