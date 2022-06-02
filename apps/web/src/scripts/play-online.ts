import { socket } from './socketio';
import toggleClass from './common/toggle-class';
import game from './common/game';

const modal = document.querySelector('[data-modal]') as HTMLDivElement;
const modalFirstStep = document.querySelector(
  '[data-modal__first-step]',
) as HTMLDivElement;
const playOnlineForm = document.querySelector(
  '[data-play-online-form]',
) as HTMLFormElement;
const playOnlineButton = document.querySelector(
  '[data-play-online-btn]',
) as HTMLButtonElement;
const closeModalButton = document.querySelector(
  '[data-close-modal-btn]',
) as HTMLButtonElement;
const disconnectButton = document.querySelector(
  '[data-disconnect-btn]',
) as HTMLButtonElement;
const scoreboardX = document.querySelector(
  '[data-scoreboard__x]',
) as HTMLParagraphElement;
const scoreboardO = document.querySelector(
  '[data-scoreboard__o]',
) as HTMLParagraphElement;

const is = {
  online: false,
};

function toggleModalVisibility() {
  toggleClass(modal, 'hidden');
  if (modalFirstStep.classList.contains('hidden')) {
    toggleClass(modalFirstStep, 'hidden');
  }
}

function handleDisconnect() {
  socket.disconnect();
  is.online = false;

  game.onOnlineChange();
  scoreboardX.textContent = 'X';
  scoreboardO.textContent = 'O';
  toggleClass(playOnlineButton, 'hidden');
  toggleClass(disconnectButton, 'hidden');
}

playOnlineButton.addEventListener('click', toggleModalVisibility);
closeModalButton.addEventListener('click', toggleModalVisibility);
disconnectButton.addEventListener('click', handleDisconnect);

function enterRoom(username: string, room: string | null) {
  socket.auth = { username };
  socket.connect();
  is.online = true;
  socket.emit('join room', room);
}

playOnlineForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.querySelector('#name-input') as HTMLInputElement;
  const roomInput = document.querySelector('#room-input') as HTMLInputElement;

  const name = nameInput.value;
  const room = roomInput.value !== '' ? roomInput.value : null;

  enterRoom(name, room);
});

export default is;
