let cellsState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let isDraw: boolean;
let currentPlayer = 'X';
let scoreboard = {
  X: 0,
  O: 0,
  draw: 0,
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const playerTurn = document.querySelector('[data-player-turn]')!;
const gameOverText = document.querySelector('[data-game-over]')!;
const restartButton = document.querySelector('[data-game-over__restart]')!;

restartButton.addEventListener('click', handleRestartGame);

const playerXScore = document.querySelector('[data-scoreboard__x-score]')!;
const drawScore = document.querySelector('[data-scoreboard__draw-score]')!;
const playerOScore = document.querySelector('[data-scoreboard__o-score]')!;

const cells: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll('[data-cell]');

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e: Event) {
  const clickedCell = e.target as HTMLButtonElement;
  const clickedCellIndex: number = parseInt(
    clickedCell.getAttribute('data-index') as string,
  );

  handlePlayCell(clickedCell, clickedCellIndex);
}

function handlePlayCell(
  clickedCell: HTMLButtonElement,
  clickedCellIndex: number,
) {
  cellsState[clickedCellIndex] = currentPlayer;

  clickedCell.textContent = currentPlayer;
  clickedCell.setAttribute('disabled', 'true');
  clickedCell.style.cursor = 'not-allowed';

  winningConditions.forEach((winningCondition) => {
    isGameActive && checkWin(winningCondition);
  });

  checkDraw();
  switchPlayer();
}

function checkWin(cells: number[]) {
  let cellsSequence = ['', '', ''];

  cells.forEach((cell, i) => {
    cellsSequence[i] = cellsState[cell];
  });

  const isWinner = cellsSequence.every((cell) => cell === currentPlayer);

  if (isWinner) {
    handleEndGame();
    return;
  }
}

function checkDraw() {
  if (!isGameActive) return;
  isDraw = !cellsState.includes('');

  if (isDraw) handleEndGame();
}

function switchPlayer() {
  if (!isGameActive) return;

  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }

  playerTurn.innerHTML = `Vez de <strong>${currentPlayer}</strong>`;
}

function handleEndGame() {
  isGameActive = false;
  updateScoreboard();

  cells.forEach((cell) => {
    cell.setAttribute('disabled', 'true');
    cell.style.cursor = 'not-allowed';
  });

  playerTurn.classList.add('hidden');
  gameOverText.classList.remove('hidden');
  playerXScore.textContent = scoreboard.X.toString();
  playerOScore.textContent = scoreboard.O.toString();
  drawScore.textContent = scoreboard.draw.toString();
}

function updateScoreboard() {
  if (isDraw) {
    scoreboard.draw++;
    return;
  }

  if (currentPlayer === 'X') scoreboard.X++;
  if (currentPlayer === 'O') scoreboard.O++;
}

function handleRestartGame() {
  isGameActive = true;
  currentPlayer = 'X';
  cellsState = ['', '', '', '', '', '', '', '', ''];

  playerTurn.classList.remove('hidden');
  playerTurn.innerHTML = `Vez de <strong>${currentPlayer}</strong>`;
  gameOverText.classList.add('hidden');

  cells.forEach((cell) => {
    cell.removeAttribute('disabled');
    cell.style.cursor = 'pointer';
    cell.textContent = '';
  });
}
