let cellsState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
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

  if (!isGameActive) return;

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
    alert(`Player ${currentPlayer} wins`);
    handleEndGame();
    return;
  }
}

function checkDraw() {
  const isDraw = !cellsState.includes('');
  if (isDraw) alert('No one wins');
}

function switchPlayer() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}

function handleEndGame() {
  isGameActive = false;

  cells.forEach((cell) => {
    cell.setAttribute('disabled', 'true');
    cell.style.cursor = 'not-allowed';
  });
}
