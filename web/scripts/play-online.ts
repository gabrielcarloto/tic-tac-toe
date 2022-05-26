import { socket } from './socketio';
import { handleRestartGame as restartOnConnect } from './game';

interface IPlayer {
  userID: string;
  username: string;
  symbol: string;
  self: boolean;
}

let player: IPlayer;
let players: IPlayer[];

const modal = document.querySelector('[data-modal]')!;
const modalContent = document.querySelector('[data-modal__content]')!;
const playOnlineForm: HTMLFormElement = document.querySelector(
  '[data-play-online-form]',
)!;
const playOnlineButton: HTMLButtonElement = document.querySelector(
  '[data-play-online-btn]',
)!;
const closeModalButton: HTMLButtonElement = document.querySelector(
  '[data-close-modal-btn]',
)!;
const scoreboardX: HTMLParagraphElement = document.querySelector(
  '[data-scoreboard__x]',
)!;
const scoreboardO: HTMLParagraphElement = document.querySelector(
  '[data-scoreboard__o]',
)!;

function toggleClass(element: Element, className: string) {
  element.classList.toggle(className);
}

playOnlineButton.addEventListener('click', toggleModalVisibility);
closeModalButton.addEventListener('click', toggleModalVisibility);

function toggleModalVisibility() {
  toggleClass(modal, 'hidden');
  toggleClass(playOnlineButton, 'invisible');

  console.log('clicked');
}

playOnlineForm.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  const nameInput: HTMLInputElement = document.querySelector('#name-input')!;
  const roomInput: HTMLInputElement = document.querySelector('#room-input')!;

  const name = nameInput.value;
  const room = roomInput.value !== '' ? roomInput.value : null;

  enterRoom(name, room);
});

function enterRoom(username: string, room: string | null) {
  socket.auth = { username };
  socket.connect();

  listUsers();
}

function listUsers() {
  socket.on('users', (users: any[]) => {
    users.forEach((user) => {
      if ((user.self = user.userID === socket.id)) player = user;
    });

    players = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });

    console.log(player);

    waitConnection();
  });
}

function waitConnection() {
  if (players.length < 2) {
    modalContent.innerHTML =
      '<h3 class="text-xl xl:text-2xl">aguardando o outro jogador...</h3>';
  } else {
    updateView();
  }
}

function updateView() {
  toggleClass(modal, 'hidden');
  toggleClass(playOnlineButton, 'hidden');

  players.forEach((player) => {
    if (player.symbol === 'X') {
      scoreboardX.textContent = `${player.username} (X)`;
    } else {
      scoreboardO.textContent = `${player.username} (O)`;
    }
  });

  // if the player already clicked in a cell
  restartOnConnect();
}

socket.on('user connected', (user) => {
  players = [...players, user];
  waitConnection();
});

export { player, players };
