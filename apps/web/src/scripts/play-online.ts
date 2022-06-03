import { socket } from './socketio';
import toggleClass from './common/toggle-class';
import game from './common/game';
import IException from './Interfaces/IException';

const modal = document.querySelector('[data-modal]') as HTMLDivElement;
const modalFirstStep = document.querySelector(
  '[data-modal__first-step]',
) as HTMLDivElement;
const modalSecondStep = document.querySelector(
  '[data-modal__second-step]',
) as HTMLDivElement;
const errFullRoomLabel = document.querySelector(
  '[data-full-room]',
) as HTMLSpanElement;
const playOnlineForm = document.querySelector(
  '[data-play-online-form]',
) as HTMLFormElement;
const roomInput = document.querySelector(
  '[data-room-input]',
) as HTMLInputElement;
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
  roomInput.value = '';
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
  errFullRoomLabel.classList.add('hidden');
  toggleClass(playOnlineButton, 'hidden');
  toggleClass(disconnectButton, 'hidden');
  if (!modalSecondStep.classList.contains('hidden')) {
    toggleClass(modalSecondStep, 'hidden');
  }
}

playOnlineButton.addEventListener('click', toggleModalVisibility);
closeModalButton.addEventListener('click', toggleModalVisibility);
disconnectButton.addEventListener('click', handleDisconnect);
socket.on('player disconnected', handleDisconnect);

function enterRoom(username: string, room: string | null) {
  socket.auth = { username };
  socket.connect();
  is.online = true;
  socket.emit('join room', room);
}

socket.on('exception', (err: IException) => {
  if (err.error === 'the room is full')
    errFullRoomLabel.classList.remove('hidden');
});

playOnlineForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.querySelector('#name-input') as HTMLInputElement;

  const name = nameInput.value;
  const room = roomInput.value !== '' ? roomInput.value : null;

  enterRoom(name, room);
});

export default is;
