import { socket } from './socketio';
import toggleClass from './common/toggle-class';

const modal = document.querySelector('[data-modal]') as HTMLDivElement;
const playOnlineForm = document.querySelector(
  '[data-play-online-form]',
) as HTMLFormElement;
const playOnlineButton = document.querySelector(
  '[data-play-online-btn]',
) as HTMLButtonElement;
const closeModalButton = document.querySelector(
  '[data-close-modal-btn]',
) as HTMLButtonElement;

function toggleModalVisibility() {
  toggleClass(modal, 'hidden');
  toggleClass(playOnlineButton, 'invisible');
}

playOnlineButton.addEventListener('click', toggleModalVisibility);
closeModalButton.addEventListener('click', toggleModalVisibility);

const is = {
  online: false,
};

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
