import { io, Socket } from 'socket.io-client';
import IException from './Interfaces/IException';
import IPlayer from './Interfaces/IPlayer';
import waitConnection from './wait-connection';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const socket: Socket = io(`${BASE_URL}:3333`, { autoConnect: false });
const players: IPlayer[] = [];
const self: IPlayer = {
  userID: '',
  username: '',
  symbol: '',
  self: false,
};

socket.on('joined', (room: string) => {
  socket.on('users', (users: IPlayer[]) => {
    users.forEach((usr) => {
      const user = usr;
      user.self = usr.userID === socket.id;
      if (user.self) {
        // TODO: find a way to iterate through user and assign values to player
        self.username = user.username;
        self.userID = user.userID;
        self.symbol = user.symbol;
        self.self = user.self;
      }
    });

    const sortedUsers = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });

    sortedUsers.forEach((user) => players.push(user));

    waitConnection(players, room);
  });
});

socket.on('user connected', (user: IPlayer) => {
  players.push(user);
  waitConnection(players);
});

socket.on('connect_error', (err: Error) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

socket.on('exception', (err: IException) => {
  // eslint-disable-next-line no-console
  console.error(`Error: ${err.error}`);
});

export { socket, players, self };
