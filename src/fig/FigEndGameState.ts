
import Background from "../object2d/Background";
import TextObject from "../object2d/TextObject";
import GameControl from "../template/gamejs/GameControl";
import GameState from "../template/gamejs/GameState";
import WorldObjectType from "../template/gamejs/WorldObjectType";
import FigGame from "./FigGame";

export default class FigEndGameState extends GameState
{
    constructor(private game : FigGame)
    {
        super();
    }

    initialise=()=>
    {
        var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
        this.addGameObject(bg); 
        
        let to = new TextObject(WorldObjectType.Text,"YouWon");
        to.text = "You Won!"
        this.addGameObject(to);

    }

    bindControls(gameControl : GameControl)
    {
      gameControl.doClickEvent = () => {
        this.game.switchGameState(this.game.gameMain);

      };
      gameControl.doMouseDownEvent = function(){};
      gameControl.doTouchStartEvent = function(){};
      gameControl.doMouseMoveEvent = function(){};
      gameControl.doTouchMoveEvent = function(){};
      gameControl.doMouseUpEvent = gameControl.doClickEvent;
      gameControl.doTouchEndEvent = gameControl.doClickEvent;
    }
}