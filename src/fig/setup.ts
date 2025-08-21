import Background from "../object2d/Background";
import Ball from "../pong2/Ball";
import Pong2GameState from "../pong2/Pong2GameState";
import StaticObject from "../pong2/StaticObject";
import Game from "../template/gamejs/Game";
import GameRenderer from "../template/gamejs/GameRenderer";
import Random from "../transform/Random";
import FigMainGameState from "./FigMainGameState";
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
     
    // game.gameMain = new FigMainGameState(game,bg);
    // game.gameMain.setup();
   
    game.gameMain = Pong2GameState.createPong2GameState(game);
    

    var figGameState = game.gameMain as Pong2GameState;
    figGameState.setupStaticGameObjects = function()
    {
      var t = new Random(Date.now());
      var staticObjectCount = 0;
      for(var i = 0; i<10;i++)
      {
        for(var j = 0; j<4;j++)
        {
          var r = t.nextDouble();
          r = 1;
          if(r>0.5)
          {
            var ii = -0.4+i*.1;
            var jj = 0+j*.1;
            var so = StaticObject.createStaticObject(ii,jj,0.05,0.05,"staticImage"+i+"x"+j,game.gameRenderer.staticImages[staticObjectCount % game.gameRenderer.staticImageCount]);
            //var so = createStaticObject(ii,jj,0.1,0.1);
            so.stage = 0;
            this.staticObjectGroup.childObjectList.push(so);
          }

        }
        staticObjectCount++;
      }
      figGameState.setup();
      
    }
    figGameState.setupStaticGameObjects();
    
    figGameState.handleMaxHits = function(gameObject)
    {
      gameObject.stage++;
      gameObject.hitCount =0;
      if(gameObject.stage >2)
      {
        gameObject.stage = 3;
      }
      else
      {
        gameObject.size.add1(0.05);
      }

    }


    figGameState.handleBallHit = function(ball:Ball)
    {
      ball.hitCount ++;
      if(ball.hitCount>20)
      {
        ball.cull =true;
      }
      else
      {
        ball.size.scale(0.95);
      }
    }


    figGameState.setup();

    figGameState.bindControls = function(gameControl)
    {
      gameControl.doClickEvent = function(){};
      gameControl.doMouseDownEvent = figGameState.startAim;
      gameControl.doTouchStartEvent = figGameState.startAim;
      gameControl.doMouseMoveEvent = figGameState.aim;
      gameControl.doTouchMoveEvent = figGameState.aim;
      gameControl.doMouseUpEvent = figGameState.fire;
      gameControl.doTouchEndEvent = figGameState.fire;
    }	

  

  

}

}


