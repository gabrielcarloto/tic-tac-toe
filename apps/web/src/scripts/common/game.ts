import TicTacToe from '../tictactoe';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const game = new TicTacToe({ onSwitchPlayer, onRestartGame, onEndGame });

// prettier-ignore
const cells: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-cell]');
const playerTurn = document.querySelector(
  '[data-player-turn]',
) as HTMLHeadingElement;
const gameOverText = document.querySelector(
  '[data-game-over]',
) as HTMLDivElement;
// Scoreboard
const playerXScore = document.querySelector(
  '[data-scoreboard__x-score]',
) as HTMLParagraphElement;
const drawScore = document.querySelector(
  '[data-scoreboard__draw-score]',
) as HTMLParagraphElement;
const playerOScore = document.querySelector(
  '[data-scoreboard__o-score]',
) as HTMLParagraphElement;

function onSwitchPlayer() {
  playerTurn.innerHTML = `Vez de <strong>${game.currentPlayer}</strong>`;
}

function onRestartGame() {
  playerTurn.classList.remove('hidden');
  playerTurn.innerHTML = `Vez de <strong>${game.currentPlayer}</strong>`;
  gameOverText.classList.add('hidden');

  cells.forEach((currentCell) => {
    const cell = currentCell;

    cell.removeAttribute('disabled');
    cell.style.cursor = 'pointer';
    cell.textContent = '';
  });
}

function onEndGame() {
  cells.forEach((currentCell) => {
    const cell = currentCell;
    cell.setAttribute('disabled', 'true');
    cell.style.cursor = 'not-allowed';
  });

  playerTurn.classList.add('hidden');
  gameOverText.classList.remove('hidden');
  playerXScore.textContent = game.score.X.toString();
  playerOScore.textContent = game.score.O.toString();
  drawScore.textContent = game.score.draw.toString();
}

export default game;
