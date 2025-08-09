import GameState from "./GameState";
import GameRenderer from "/home/runner/workspace/src/template/gamejs/GameRenderer";

export default class GameAnimation {
    constructor( private _state: GameState, private _renderer: GameRenderer)
    {
      
    }
 
    stopAnimation() {
        throw new Error("Method not implemented.");
    }
    startAnimation() {
        throw new Error("Method not implemented.");
    }
    public get renderer(): GameRenderer {
        return this._renderer;
    }
    public set renderer(value: GameRenderer) {
        this._renderer = value;
    }
    public get state(): GameState {
        return this._state;
    }
    public set state(value: GameState) {
        this._state = value;
    }
}