export default interface IGameConstructor {
  onSwitchPlayer: () => void;
  onRestartGame: () => void;
  onEndGame: () => void;
}
