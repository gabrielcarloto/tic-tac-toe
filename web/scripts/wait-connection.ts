import toggleClass from './common/toggle-class';
import game from './common/game';
import IPlayer from './Interfaces/IPlayer';

const modal = document.querySelector('[data-modal]') as HTMLDivElement;
const modalContent = document.querySelector(
  '[data-modal__content]',
) as HTMLDivElement;
const scoreboardX = document.querySelector(
  '[data-scoreboard__x]',
) as HTMLParagraphElement;
const scoreboardO = document.querySelector(
  '[data-scoreboard__o]',
) as HTMLParagraphElement;
const playOnlineButton = document.querySelector(
  '[data-play-online-btn]',
) as HTMLButtonElement;

export default function waitConnection(players: IPlayer[]) {
  if (players.length < 2) {
    // prettier-ignore
    modalContent.innerHTML = '<h3 class="text-xl xl:text-2xl">aguardando o outro jogador...</h3>';
    return;
  }

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
  game.onPlayOnline();
}
