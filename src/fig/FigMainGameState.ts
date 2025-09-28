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
import LawnMower from "./object2d/LawnMower";
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
    lawnmower = new LawnMower(new Point2d(-.45,-.45), new Point2d(.1,.1));
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

        //let lawnmower = new LawnMower(new Point2d(-.45,-.45), new Point2d(.1,.1));
       
        this.gameObjectList.push(this.lawnmower);
  
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
          //this.staticObjectGroup.addChildObject(so);
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
        for(var position of soilBox.slots)
        {

            this.addStaticObject(this.staticObjectCount, position);
            this.staticObjectCount++;

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
        if(this.scoreObj.isGameFinised())
        {
          this.scoreObj.reset();
          this.game.switchGameState(this.game.gameEnd);
          return;
        }

        // //###########################################
        // //renew new flower 
        // //###########################################
        // let rect = this.randomPlacement.randomPlace();
        // if(rect != null)
        // {
        //   this.randomPlacement.addRectangle(rect);
        //   console.log("randomPlacement: ", rect);
        //   var staticImageStr = "staticImage"+this.staticObjectCount;
        //   var stc = this.game.gameRenderer.staticImages[this.staticObjectCount % this.game.gameRenderer.staticImageCount];
        //   var so = new Flower(rect.x - 0.5, rect.y -0.2, 0.05, 0.05, staticImageStr, stc,rect);
        //   so.stage = 0;
        //   this.staticObjectGroup.addChildObject(so);
        //   this.staticObjectCount++
        // }
        // //###########################################


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

    aim = (posX:number,posY:number) =>
    {
       if(posX<-.4 && posY <-.4)
      {
        this.lawnmower.hoverOn = true;
        return;
      }
      else
      {
        this.lawnmower.hoverOn = false;
      }
      var aimer = this.aimer;
  
      //aimer.visible = true;
      aimer.to.set(posX,posY);
  
      let hose = this.hose! as Hose;
      hose.to.set(posX,posY);
  
    }

    
    fire = (posX:number,posY:number) =>
    {

      if(posX<-.45 && posY <-.45)
      {
        this.lawnmower.hoverOn = true;
        return;
      }
      else
      {
        this.lawnmower.hoverOn = false;
      }

      if(this.allowFire)
      {
        console.log("fire:("+posX+","+posY+")")
        //game.gameState.gameObjectList.push(ball);
        var aimer = this.aimer;
        aimer.to.set(posX,posY);
        aimer.visible = false;
  
        this.launchX = aimer.to.x - aimer.position.x;
        this.launchY = aimer.to.y - aimer.position.y;
  
        let hose = this.hose! as Hose;
        let origin = hose.tip;
  
        for(var i = 0; i<this.ballGroupMaxSize;i++)
        {			
          var ball = this.ballList.childObjectList[i] as Ball;
          ball.origin = origin;
        }
  
        this.launch();
  
        for(var i = 0; i<5 ; i++)
        {
          setTimeout(this.launch,i * 200);
        }			
      }
    }
}