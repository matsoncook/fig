import Background from "../object2d/Background";
import Ball from "../pong2/Ball";
import Pong2GameState from "../pong2/Pong2GameState";
import StaticObject from "../pong2/StaticObject";
import Game from "../template/gamejs/Game";
import GameControl from "../template/gamejs/GameControl";
import GameObject from "../template/gamejs/GameObject";
import GameState from "../template/gamejs/GameState";
import Random from "../transform/Random";
import RectanglePlacement from "../transform/RectanglePlacement";
import Flower from "./object2d/Flower";
import Hose from "./object2d/Hose";

export default class FigMainGameState extends Pong2GameState
{
    
    constructor(game : Game, background: Background)
    {
      
        super(game,background);
        
        
    }
    setup()
    {
      
        this.setupStaticGameObjects();
        super.setup();
        this.hose = new Hose("images/flowers/hose.png");
        this.gameObjectList.push(this.hose!);
    }
    setupStaticGameObjects()
    {
      var t = new Random(Date.now());
      var staticObjectCount = 0;
      for(var i = 0; i<7;i++)
      {
        for(var j = 0; j<4;j++)
        {
          var r = t.nextDouble();
          r = 1;
          if(r>0.5)
          {
            var ii = -0.4+i*.1;
            var jj = 0+j*.1;
            var staticImageStr = "staticImage"+i+"x"+j;
            // var stc = this.game.gameRenderer.staticImages[staticObjectCount % this.game.gameRenderer.staticImageCount];
            // var so = StaticObject.createStaticObject(ii,jj,0.05,0.05,staticImageStr,stc);
            // so.stage = 0;
            // this.staticObjectGroup.childObjectList.push(so);
          }

        }
        staticObjectCount++;
      }
      let randomPlacement = new RectanglePlacement({x:0.1,y:0.1,w:0.9,h:0.6},0.05,0.05,0,0);
      randomPlacement.addRectangle({x:0.5,y:0.5,w:0.05,h:0.05});

      var staticObjectCount = 0;
      for(var i =0; i<20; i++)
      {
        let rect = randomPlacement.randomPlace();
        if(rect != null)
        {
          randomPlacement.addRectangle(rect);
          console.log("randomPlacement: ", rect);
          var staticImageStr = "staticImage"+i;
          var stc = this.game.gameRenderer.staticImages[staticObjectCount % this.game.gameRenderer.staticImageCount];
          //var so = StaticObject.createStaticObject(rect.x - 0.5, rect.y -0.5, 0.05, 0.05, staticImageStr, stc);
          var so = new Flower(rect.x - 0.5, rect.y -0.2, 0.05, 0.05, staticImageStr, stc);
          so.stage = 0;
          this.staticObjectGroup.childObjectList.push(so);
        }
        else
        {
          break;
        }

        staticObjectCount++;
      }
      

      
 
      
    }
    placeSaticImageRandom()
    {
      console.log("hello");
    }

    handleMaxHits(gameObject : GameObject)
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
    handleBallHit(ball:Ball)
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

    bindControls(gameControl : GameControl)
    {
      gameControl.doClickEvent = function(){};
      gameControl.doMouseDownEvent = this.startAim;
      gameControl.doTouchStartEvent = this.startAim;
      gameControl.doMouseMoveEvent = this.aim;
      gameControl.doTouchMoveEvent = this.aim;
      gameControl.doMouseUpEvent = this.fire;
      gameControl.doTouchEndEvent = this.fire;
    }	

    advanceStaticObjects(): void {
      //override this so no advance
    }
}