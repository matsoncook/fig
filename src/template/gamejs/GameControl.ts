import GameRenderer from "./GameRenderer";

export default class GameControl {
  constructor(private _gameRenderer: GameRenderer)
  {
    
  }
    
    public get gameRenderer(): GameRenderer {
        return this._gameRenderer;
    }
    public set gameRenderer(value: GameRenderer) {
        this._gameRenderer = value;
    }
}