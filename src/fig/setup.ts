import Game from "../template/gamejs/Game";
import GameRenderer from "../template/gamejs/GameRenderer";
export default class FigGame
{
  game : Game | null = null;
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

      this.game = new Game(gameRenderer);


     
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
  }


