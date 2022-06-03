export default interface IGameConstructor {
  onSwitchPlayer: () => void;
  onRestartGame: () => void;
  onEndGame: (winnerCellsSequence: number[]) => void;
}
