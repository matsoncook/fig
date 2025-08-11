import GameControl from "./GameControl";
import GameObject from "./GameObject";

export default class GameState {
  //render tree
  constructor()
  {
    this.gameObjectList.push(this.staticObjectGroup);
  }
  gameObjectList : GameObject[] = [];
  initialise: () => void = ()=>{};
  staticObjectGroup:  GameObject = new GameObject(0,"Group");;
  addGameObject(gameObject: GameObject) {
    this.gameObjectList.push(gameObject);
  }

  bindControls(gameControl: GameControl) {}
  //this.previousTime = 0;
  advance(time: number) {
    this.beforeAdvance(time);
    for (var i = 0; i < this.gameObjectList.length; i++) {
      var gameObject = this.gameObjectList[i];
      gameObject.advance(time);
    }
  }
  //replace this one
  beforeAdvance(time : number) {}
  setup() {}
  switchGameStateOut() {}

  switchGameStateIn() {}
}
