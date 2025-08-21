import Background from "../object2d/Background";
import Ball from "../pong2/Ball";
import Pong2GameState from "../pong2/Pong2GameState";
import StaticObject from "../pong2/StaticObject";
import Game from "../template/gamejs/Game";
import GameRenderer from "../template/gamejs/GameRenderer";
import Random from "../transform/Random";
import FigGame from "./FigGame";
import FigMainGameState from "./FigMainGameState";
export default class SetupFigGame
{

    game : FigGame | null = null;
    setupGame(canvas:HTMLCanvasElement,controlCanvas :HTMLCanvasElement,audio :any)
    {
      //testLineSegmentIntersecter();
      let gameRenderer = new GameRenderer(canvas,controlCanvas);
      

      this.game = new FigGame(gameRenderer);

      this.game.switchGameState(this.game.gameIntro);
    }

//   setupIntro()
//   {
    
//     //this.game.gameIntro = createGameIntro();
//     var game = this.game;


//     this.game!.gameIntro.bindControls = function(gameControl)
//     {
//       gameControl.doClickEvent = () => {
//         game!.switchGameState(game!.gameMain);

//       };
//       gameControl.doMouseDownEvent = function(){};
//       gameControl.doTouchStartEvent = function(){};
//       gameControl.doMouseMoveEvent = function(){};
//       gameControl.doTouchMoveEvent = function(){};
//       gameControl.doMouseUpEvent = gameControl.doClickEvent;
//       gameControl.doTouchEndEvent = gameControl.doClickEvent;
//     }
//   }

//   setupMainGame()
//   {
//     let game = this.game!;

//      var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
     
//     game.gameMain = new FigMainGameState(game,bg);
//     game.gameMain.setup();
   

  

// }

}


