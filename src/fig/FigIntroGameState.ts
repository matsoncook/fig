import Intro from "../pong2/Intro";
import Game from "../template/gamejs/Game";
import GameControl from "../template/gamejs/GameControl";
import GameState from "../template/gamejs/GameState";

export default class FigIntroGameState extends Intro
{
    // constructor(private game : Game)
    // {
    //     super(game);
    // }
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