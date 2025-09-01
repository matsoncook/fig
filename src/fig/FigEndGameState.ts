
import Background from "../object2d/Background";
import GameControl from "../template/gamejs/GameControl";
import GameState from "../template/gamejs/GameState";
import FigGame from "./FigGame";

export default class FigIntroGameState extends GameState
{
    constructor(private game : FigGame)
    {
        super();
    }

    initialise=()=>
    {
        var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
        this.addGameObject(bg); 

    
    
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