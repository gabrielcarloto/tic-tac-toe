import game from './common/game';
import is from './play-online';
import { socket, self as player } from './socketio';

// prettier-ignore
const cells: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector(
  '[data-game-over__restart]',
) as HTMLButtonElement;

const X = '<i class="ph-x-thin"></i>';
const O = '<i class="ph-circle-thin"></i>';

function markClickedCell(cell: HTMLButtonElement) {
  const clickedCell = cell;

  clickedCell.innerHTML = game.currentPlayer === 'X' ? X : O;
  clickedCell.setAttribute('disabled', 'true');
  clickedCell.style.cursor = 'not-allowed';
}

function handleCellClick(e: Event) {
  const clickedCell = e.target as HTMLButtonElement;
  const clickedCellIndex: number = parseInt(
    clickedCell.getAttribute('data-index') as string,
    10,
  );

  if (!is.online) {
    markClickedCell(clickedCell);
    game.onCellClick(clickedCellIndex);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (is.online && player.symbol === game.currentPlayer) {
    socket.emit('cell clicked', clickedCellIndex);
    markClickedCell(clickedCell);
    game.onCellClick(clickedCellIndex);
  }
}

socket.on('cell clicked', (clickedCellIndex: number) => {
  const clickedCell = document.querySelector(
    `[data-index='${clickedCellIndex}']`,
  ) as HTMLButtonElement;

  markClickedCell(clickedCell);
  game.onCellClick(clickedCellIndex);
});

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', () => {
  socket.emit('restart game');
  game.restartGame();
});

socket.on('restart game', () => game.restartGame());
