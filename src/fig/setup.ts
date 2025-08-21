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
      gameRenderer.setSize(window.innerWidth,window.innerHeight);
      gameRenderer.staticImageCount = 8;

       for(var i = 0;i<gameRenderer.staticImageCount;i++)
        {
          gameRenderer.staticImages[i] = new Image();
        }
        for(var i = 0;i<gameRenderer.staticImageCount;i++)
        {
          gameRenderer.staticImages[i].src="images/flowers/download0"+i+".png";
        }

      this.game = new FigGame(gameRenderer);

        this.setupIntro();
        this.setupMainGame();


      
	    gameRenderer.ballImage1.src = "images/flowers/drop01.png";
	    gameRenderer.ballImage2.src = "images/flowers/drop00.png";
	    gameRenderer.ballImage3.src = "images/flowers/drop02.png";



     this.game.switchGameState(this.game.gameIntro);
    }

  setupIntro()
  {
    
    //this.game.gameIntro = createGameIntro();
    var game = this.game;


    this.game!.gameIntro.bindControls = function(gameControl)
    {
      gameControl.doClickEvent = () => {
        game!.switchGameState(game!.gameMain);

      };
      gameControl.doMouseDownEvent = function(){};
      gameControl.doTouchStartEvent = function(){};
      gameControl.doMouseMoveEvent = function(){};
      gameControl.doTouchMoveEvent = function(){};
      gameControl.doMouseUpEvent = gameControl.doClickEvent;
      gameControl.doTouchEndEvent = gameControl.doClickEvent;
    }
  }

  setupMainGame()
  {
    let game = this.game!;

     var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
     
    game.gameMain = new FigMainGameState(game,bg);
    game.gameMain.setup();
   

  

}

}


