import { Cell, Player, Results, Score } from './Types/tictactoe';
import IGameConstructor from './Interfaces/IGameConstructor';
import IScore from './Interfaces/IScore';

export default class TicTacToe {
  public currentPlayer: Player = 'X';

  get score() {
    return structuredClone(this.scoreboard) as IScore;
  }

  private isGameActive = true;

  private cellsState: Cell[] = ['', '', '', '', '', '', '', '', ''];

  private winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  private scoreboard = {
    X: 0,
    O: 0,
    draw: 0,
  };

  private onSwitchPlayer: () => void;

  private onRestartGame: () => void;

  private onEndGame: (winnerCellsSequence: number[]) => void;

  constructor({ onSwitchPlayer, onRestartGame, onEndGame }: IGameConstructor) {
    this.onSwitchPlayer = onSwitchPlayer;
    this.onRestartGame = onRestartGame;
    this.onEndGame = onEndGame;
  }

  public onCellClick(clickedCellIndex: number) {
    this.cellsState[clickedCellIndex] = this.currentPlayer;

    this.checkResults();

    if (this.isGameActive) this.switchPlayer();
  }

  public onOnlineChange() {
    Object.keys(this.scoreboard).forEach((score) => {
      this.scoreboard[score as Score] = 0;
    });

    this.currentPlayer = 'X';
    this.isGameActive = true;
    this.cellsState = ['', '', '', '', '', '', '', '', ''];
    this.onRestartGame();
  }

  public restartGame() {
    this.isGameActive = true;
    this.switchPlayer();
    this.cellsState = ['', '', '', '', '', '', '', '', ''];
    this.onRestartGame();
  }

  private checkResults() {
    const cellsSequence: Cell[] = ['', '', ''];
    let winnerIndexes: number[];

    // eslint-disable-next-line no-restricted-syntax
    for (const winningCondition of this.winningConditions) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [index, cell] of winningCondition.entries()) {
        cellsSequence[index] = this.cellsState[cell];
      }

      const isWin = cellsSequence.every((cell) => cell === this.currentPlayer);
      if (isWin) {
        winnerIndexes = winningCondition;
        this.updateScoreboard('win');
        this.endGame(winnerIndexes);
        return;
      }
    }

    const isDraw = !this.cellsState.includes('');
    if (isDraw) {
      this.updateScoreboard('draw');
      this.endGame([]);
    }
  }

  private switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.onSwitchPlayer();
  }

  private updateScoreboard(result: Results) {
    if (result === 'draw') this.scoreboard.draw += 1;
    if (result === 'win') this.scoreboard[this.currentPlayer] += 1;
  }

  private endGame(winnerCellsSequence: number[]) {
    this.isGameActive = false;
    this.onEndGame(winnerCellsSequence);
  }
}
