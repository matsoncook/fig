import GameAnimation from "./GameAnimation";
import GameControl from "./GameControl";
import GameObject from "./GameObject";
import GameRenderer from "./GameRenderer";
import GameState from "./GameState";

export default class Game {
  //@Deprecated
  extendedState = false;

  soundEnabled = false;

  //gameRenderer = new GameRenderer();
  gameState = new GameState();
  gameControl = new GameControl(this.gameRenderer,this.gameRenderer.controlCanvas);
  gameAnimation = new GameAnimation(this.gameState, this.gameRenderer);
  //gameIntro : any;

  //TODO This may need to extended out
  gameIntro = new GameState();
  gameMain = new GameState();

  loading = false;

  lastTimeChecked = 0;
  firstTimeChecked = 0;
  maxCheckMediaTime = 1000;
  mediaList = [];

  constructor(private _gameRenderer: GameRenderer) {}
  setup() {
    // this.gameIntro = {
    //   gameObjectList :  [],

    //   isNowPlaying : function()
    //   {
    //     return false;
    //   }
    // };
    this.gameAnimation.gameState = this.gameState;
    this.gameAnimation.gameRenderer = this.gameRenderer;
    this.gameControl.gameRenderer = this.gameRenderer;
    this.gameControl.setupControls()
  }

  addGameObject(gameObject: GameObject) {
    this.gameState.gameObjectList.push(gameObject);
  }

  start() {
    this.gameAnimation.startAnimation();
  }
  // start1()
  // {
  //   this.loading = false;
  //   this.gameAnimation.startAnimation();
  // }

  stop() {
    this.gameAnimation.stopAnimation();
  }

  checkAllLoaded(theTime: number) {
    if (this.firstTimeChecked != 0) {
      if (theTime - this.firstTimeChecked > this.maxCheckMediaTime) {
        return true;
      }
    } else {
      this.firstTimeChecked = theTime;
    }
  }

  switchGameState(gameState: GameState) {
    this.gameState.switchGameStateOut();
    this.gameState = gameState;

    this.gameState.bindControls(this.gameControl);
    this.gameState.switchGameStateIn();
  }

  restart() {}

  public get gameRenderer(): GameRenderer {
    return this._gameRenderer;
  }
  public set gameRenderer(value: GameRenderer) {
    this._gameRenderer = value;
  }
}
