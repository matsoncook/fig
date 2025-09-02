import Background from "../object2d/Background";
import GroupObject from "../object2d/GroupObject";
import Ball from "../pong2/Ball";
import Pong2GameState from "../pong2/Pong2GameState";
import StaticObject from "../pong2/StaticObject";
import Game from "../template/gamejs/Game";
import GameControl from "../template/gamejs/GameControl";
import GameObject from "../template/gamejs/GameObject";
import GameState from "../template/gamejs/GameState";
import { Point2d } from "../transform/Point2d";
import Random from "../transform/Random";
import RectanglePlacement from "../transform/RectanglePlacement";
import Flower from "./object2d/Flower";
import Hose from "./object2d/Hose";
import SoilBox from "./object2d/SoilBox";
import Sun from "./object2d/Sun";
import Score from "./Score";

export default class FigMainGameState extends Pong2GameState
{
    randomPlacement = new RectanglePlacement({x:0.1,y:0.1,w:0.9,h:0.6},0.05,0.05,0,0);
    staticObjectCount = 0;

    sunGroup : GroupObject = new GroupObject("sunGroup");
    soilGroup : GroupObject = new GroupObject("soilGroup");
    scoreObj : Score = new Score();
    constructor(game : Game, background: Background)
    {

        super(game,background);

        let soilSize = new Point2d(.25,.25);
        let soil1 = new SoilBox(new Point2d(-0.2,.25),soilSize);
        this.soilGroup.addChildObject(soil1);
        let soil2 = new SoilBox(new Point2d(0.2,.25),soilSize);
        this.soilGroup.addChildObject(soil2,);
        let soil3 = new SoilBox(new Point2d(-0.2,-.15),soilSize);
        this.soilGroup.addChildObject(soil3);
        let soil4 = new SoilBox(new Point2d(0.2,-.15),soilSize);
        this.soilGroup.addChildObject(soil4);

        this.gameObjectList.push(this.sunGroup);

        this.sunGroup.addChildObject(new Sun());

        this.gameObjectList.push(this.scoreObj);


  
    }
    setup()
    {
        this.gameObjectList.splice(1, 0, this.soilGroup);
        this.setupStaticGameObjects();
        super.setup();
        this.hose = new Hose("images/flowers/hose.png");
        this.gameObjectList.push(this.hose!);
    }
    setupStaticGameObjects()
    {
      var t = new Random(Date.now());

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
        this.staticObjectCount++;
      }
     
      //randomPlacement.addRectangle({x:0.5,y:0.5,w:0.05,h:0.05});

      
      for(var i =0; i<20; i++)
      {
        let rect = this.randomPlacement.randomPlace();
        if(rect != null)
        {
          this.randomPlacement.addRectangle(rect);
          console.log("randomPlacement: ", rect);
          var staticImageStr = "staticImage"+this.staticObjectCount;
          var stc = this.game.gameRenderer.staticImages[this.staticObjectCount % this.game.gameRenderer.staticImageCount];
          var so = new Flower(rect.x - 0.5, rect.y -0.2, 0.05, 0.05, staticImageStr, stc,rect);
          so.stage = 0;
          this.staticObjectGroup.addChildObject(so);
        }
        else
        {
          break;
        }

        this.staticObjectCount++;
      }
      this.staticObjectCount = 0;
      for(var gameObject of this.soilGroup.childObjectList)
      {
        let soilBox : SoilBox = gameObject as SoilBox;
        for(var x = -1; x <=1; x+=2)
        {
          for(var y = -1; y <=1; y+=2)
          {
            let position = new Point2d();

            //this.addStaticObject(this.staticObjectCount, position);

            this.staticObjectCount++;
          }
        }

      }

    }
    addStaticObject(count : number, position : Point2d)
    {
        var staticImageStr = "staticImage" + count;
        var stc = this.game.gameRenderer.staticImages[count % this.game.gameRenderer.staticImageCount];
        var so = new Flower(position.x, position.y, 0.05, 0.05, staticImageStr, stc);
        so.stage = 0;
        this.staticObjectGroup.addChildObject(so);
    }
    placeSaticImageRandom()
    {
      console.log("hello");
    }

    handleMaxHits(gameObject : Flower)
    {
      gameObject.stage++;
      gameObject.hitCount =0;
      if(gameObject.stage >2)
      {
        gameObject.stage = 3;
        this.randomPlacement.removeRectangle(gameObject.placementRect);
        gameObject.removeFromParent();

        this.scoreObj.score++;
        if(this.scoreObj.score > 0)
        {
          this.scoreObj.score = 0;
          this.game.switchGameState(this.game.gameEnd);
          return;
        }

        //###########################################
        let rect = this.randomPlacement.randomPlace();
        if(rect != null)
        {
          this.randomPlacement.addRectangle(rect);
          console.log("randomPlacement: ", rect);
          var staticImageStr = "staticImage"+this.staticObjectCount;
          var stc = this.game.gameRenderer.staticImages[this.staticObjectCount % this.game.gameRenderer.staticImageCount];
          var so = new Flower(rect.x - 0.5, rect.y -0.2, 0.05, 0.05, staticImageStr, stc,rect);
          so.stage = 0;
          this.staticObjectGroup.addChildObject(so);
          this.staticObjectCount++
        }
        //###########################################


        let sun = new Sun(gameObject.position);
        this.sunGroup.addChildObject(sun);
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