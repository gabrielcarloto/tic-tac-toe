import toggleClass from './common/toggle-class';
import game from './common/game';
import IPlayer from './Interfaces/IPlayer';

const modal = document.querySelector('[data-modal]') as HTMLDivElement;
const modalFirstStep = document.querySelector(
  '[data-modal__first-step]',
) as HTMLDivElement;
const modalSecondStep = document.querySelector(
  '[data-modal__second-step]',
) as HTMLDivElement;
const modalCopyRoomBtn = document.querySelector(
  '[data-modal__room-btn]',
) as HTMLButtonElement;
const modalRoom = document.querySelector(
  '[data-modal__room]',
) as HTMLSpanElement;
const scoreboardX = document.querySelector(
  '[data-scoreboard__x]',
) as HTMLParagraphElement;
const scoreboardO = document.querySelector(
  '[data-scoreboard__o]',
) as HTMLParagraphElement;
const playOnlineButton = document.querySelector(
  '[data-play-online-btn]',
) as HTMLButtonElement;

export default function waitConnection(players: IPlayer[], room?: string) {
  if (players.length < 2) {
    toggleClass(modalFirstStep, 'hidden');
    toggleClass(modalSecondStep, 'hidden');

    modalRoom.textContent = room as string;

    modalCopyRoomBtn.addEventListener('click', () => {
      // eslint-disable-next-line no-void
      void navigator.clipboard.writeText(room as string);
    });

    return;
  }

  toggleClass(modal, 'hidden');
  toggleClass(modalFirstStep, 'hidden');
  toggleClass(playOnlineButton, 'hidden');

  players.forEach((player) => {
    if (player.symbol === 'X') {
      scoreboardX.textContent = `${player.username} (X)`;
    } else {
      scoreboardO.textContent = `${player.username} (O)`;
    }
  });

  // if the player already clicked in a cell
  game.onPlayOnline();
}
