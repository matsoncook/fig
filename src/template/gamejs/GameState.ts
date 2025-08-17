import GroupObject from "../../object2d/GroupObject";
import GameControl from "./GameControl";
import GameObject from "./GameObject";

export default class GameState {


 
  gameObjectList : GameObject[] = [];
  initialise: () => void = ()=>{};

  
  //TODO - this is for intro
  advance1 = 0;
  staticObjectGroup:  GroupObject = new GroupObject("staticObjectGroup");
   //---------------
  //render tree
  constructor()
  {
    this.gameObjectList.push(this.staticObjectGroup);
  }
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
