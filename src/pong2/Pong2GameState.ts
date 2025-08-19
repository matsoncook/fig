import Aimer from "../object2d/Aimer";
import Background from "../object2d/Background";
import GroupObject from "../object2d/GroupObject";
import TextObject from "../object2d/TextObject";
import Game from "../template/gamejs/Game";
import GameObject from "../template/gamejs/GameObject";
import GameState from "../template/gamejs/GameState";
import WorldObjectType from "../template/gamejs/WorldObjectType";
import Random from "../transform/Random";
import Ball from "./Ball";
import StaticObject from "./StaticObject";

export default class Pong2GameState extends GameState
{
  ballList =  new GroupObject("ballList");
  ballGroupMaxSize = 5;
  staticObjectCount = 0;

  aimer = new Aimer(WorldObjectType.AimerObject,"aimer");
  allowFire = true;
  launchX: number = 0;
  launchY: number = 0;


  previousSomeBallsInPlayState = false;
  isSomeBallsInPlayState = false;

  score = 0;
  scoreObject = new TextObject(WorldObjectType.Text,"ScoreText");


  //TODO - get rid of Game? - as only for static objects
  static createPong2GameState(game : Game) : Pong2GameState
  {

    var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
    var gameState = new Pong2GameState(game,bg);
    //Done in base class
    //gameState.gameObjectList.push(gameState.staticObjectGroup);
    

    return gameState;
  }

  constructor( private game : Game,private backgroundObject : Background)
  {
      super();

      this.gameObjectList.unshift(backgroundObject);
      this.addGameObject(this.ballList);

      //this.setupStaticGameObjects();

      this.gameObjectList.push(this.aimer);
      this.aimer.position.set(0,-0.5);
  }


  setupBallGameObjects()
  {
    for(var i = 0; i<this.ballGroupMaxSize;i++)
    {
      var ball = Ball.createBall();
      ball.cull = true;

      this.ballList.childObjectList.push(ball);
    }
  }

  setupStaticGameObjects()
	{
    var staticObjectCount = 0;
		var t = new Random(Date.now());
		for(var i = 0; i<10;i++)
		{
			for(var j = 0; j<5;j++)
			{
				var r = t.nextDouble();

				if(r>0.5)
				{
					var ii = -0.45+i*.1;
					var jj = 0+j*.1;
					this.staticObjectGroup.childObjectList.push(StaticObject.createStaticObject(ii,jj,0.1,0.1,"staticImage"+i+"x"+j,this.game.gameRenderer.staticImages[staticObjectCount % this.game.gameRenderer.staticImageCount]));
					staticObjectCount++;
				}

			}
		}
	}
  handleMaxHits(closestStaticObject : GameObject)
  {
     closestStaticObject.setFuse(20);
     //closestStaticObject.destroySound.play();
     this.addScore();
  }
   
  handleBallHit(ball:Ball)
  {
    //ball.hitSound.play();

    ball.hitCount ++;
    if(ball.hitCount>20)
    {
      ball.cull =true;
    }
    else
    {
      //ball.size.scale(0.95);
    }

  }
  aim = (posX:number,posY:number) =>
  {
    var aimer = this.aimer;

    //aimer.visible = true;
    aimer.to.set(posX,posY);

  }
  startAim = (posX:number,posY:number) =>
  {
    var aimer = this.aimer;
    aimer.visible = true;
    aimer.to.set(posX,posY);

  }
  fire = (posX:number,posY:number) =>
  {
    if(this.allowFire)
    {
      console.log("fire:("+posX+","+posY+")")
      //game.gameState.gameObjectList.push(ball);
      var aimer = this.aimer;
      aimer.to.set(posX,posY);
      aimer.visible = false;

      this.launchX = aimer.to.x - aimer.position.x;
      this.launchY = aimer.to.y - aimer.position.y;
      this.launch();

      for(var i = 0; i<5 ; i++)
      {
        setTimeout(this.launch,i * 200);
      }			
    }
  }
  launch() {
    for(var i = 0; i<this.ballGroupMaxSize;i++)
    {			
      var ball = this.ballList.childObjectList[i] as Ball;
      //console.log("x: "+ball.name);
      if(ball.cull)
      {
        //ball.playLaunchSound();

        ball.cull = false;
        ball.reset();
        ball.velocity.x = this.launchX;
        ball.velocity.y = this.launchY;

        ball.velocity.normalize().scale(0.01);
        break;
      }
    }
  }

  switchGameStateIn()
  {
   
    this.staticObjectGroup.childObjectList = [];
    this.setupStaticGameObjects();


  }
  switchGameStateOut()
  {
    for(var j = 0; j < this.staticObjectGroup.childObjectList.length; j++ )
    {

      var staticObject = this.staticObjectGroup.childObjectList[j];
      staticObject.hitCount = 0;
      staticObject.cull = false;
    }
    for(var i = 0; i<this.ballGroupMaxSize;i++)
    {
      var ball = this.ballList.childObjectList[i];
      ball.cull = true;


    }
    this.resetBalls();
  }

  resetBalls()
  {
    for(var i = 0; i < this.ballList.childObjectList.length; i++ )
    {
      var ball = this.ballList.childObjectList[i] as Ball;
      ball.reset();

    }
  }

  beforeAdvance(time : number)
  {
    if(this.isGameFinished())
    {
      this.handleGameFinished();
      return;

    }

    //------------
    this.previousSomeBallsInPlayState = this.isSomeBallsInPlayState;
    this.isSomeBallsInPlayState = this.isSomeBallsInPlay();
    if(!this.isSomeBallsInPlayState)
    {
      if(this.previousSomeBallsInPlayState )
      {
        this.resetBalls();
        this.advanceStaticObjects();
      }
      else
      {
        this.allowFire = true;
      }
    }
    else
    {
      this.allowFire = false;
      this.checkAndHandleHits();
    }
    //------------


    this.handleBallChangeDirection();



  } 
  
  handleGameFinished()
  {
    this.game.switchGameState(this.game.gameWrapUp);
  }
  isGameFinished(){
    // var diff = (Date.now() - initTime)/1000;
    // if( diff > 2)
    //   {
    //   return true;
    //   }


    return this.isAllStaticObjectsDestroyed() 
      || this.isStaticObjectAtFinishLine();


  }
  isStaticObjectAtFinishLine()
  {
     for(var j = 0; j < this.staticObjectGroup.childObjectList.length; j++ )
    {
      var staticObject = this.staticObjectGroup.childObjectList[j];

      if(!staticObject.cull && staticObject.position.y < -0.4)
      {
        return true;
      }
    }
  }

  isSomeBallsInPlay()
  {
    var ret = false;

    for(var i = 0; i < this.ballList.childObjectList.length; i++ )
    {
      var ball = this.ballList.childObjectList[i];
      if(!ball.cull)
      {
        ret = true;
      }

    }


    return ret;
  }
  
  advanceStaticObjects()
  {
    //this.advanceSound.play();
    for(var j = 0; j < this.staticObjectGroup.childObjectList.length; j++ )
    {

      var staticObject = this.staticObjectGroup.childObjectList[j];
      staticObject.position.y -= 0.05;
    }

  }

  checkAndHandleHits()
  {
    //check for hits
    for(var i = 0; i < this.ballList.childObjectList.length; i++ )
    {
      var ball = this.ballList.childObjectList[i] as Ball;
      if(ball.cull)continue;
      var intersectsCount = 0;
      var closestStaticObject = null;
      var closestBallObject = null;
      for(var j = 0; j < this.staticObjectGroup.childObjectList.length; j++ )
      {

        var staticObject = this.staticObjectGroup.childObjectList[j] as StaticObject;
        if(staticObject.cull || staticObject.fuseOn) continue;



        if (staticObject.intersects(ball.position,ball.velocity))
        {
          intersectsCount++
          if(closestStaticObject!=null)
          {
            if(staticObject.t < closestStaticObject.t)
            {
              closestStaticObject = staticObject
              closestBallObject = ball;
            }
          }
          else
          {
            closestStaticObject = staticObject;
            closestBallObject = ball;
          }


        }
      }
      if(closestStaticObject!=null)
      {

        if(closestStaticObject.dirY != 0)
        {
          ball.velocity.y = -ball.velocity.y;
        }
        if(closestStaticObject.dirX != 0)
        {
          ball.velocity.x = -ball.velocity.x;
        }

        if(closestStaticObject.hitCount > 5)
        {

          //closestStaticObject.setFuse(20);
          this.handleMaxHits(closestStaticObject);


        }
        else
        {
          closestStaticObject.hitCount++;
        }

        this.handleBallHit(ball);

        //if(closestStaticObject)
      }


    }
  }

  handleBallChangeDirection(){
    for(var i = 0; i < this.ballList.childObjectList.length; i++ )
    {
      var ball = this.ballList.childObjectList[i] as Ball;
      ball.changeDirection(0.5,0.5);
    }
  }

  isAllStaticObjectsDestroyed()
  {
    var allStaticObjectsDestroyed = true;
    for(var j = 0; j < this.staticObjectGroup.childObjectList.length; j++ )
    {
      var staticObject = this.staticObjectGroup.childObjectList[j];

      if(!staticObject.cull)
      {
        allStaticObjectsDestroyed = false;
        break;
      }
    }
    return allStaticObjectsDestroyed;
  }

  addScore()
  {
    this.score++;
    this.scoreObject.text = "Score: "+this.score;
  }
  setScore()
  {

  }
  
}

/*








function createPong2GameState()
{
  var gameState = new GameState();

  var bg = createBackgroundImageObject("images/flowers/lawn.jpg");
  gameState.backgroundObject = bg;
  gameState.addGameObject(bg);

  gameState.advanceSound = createAudioObject("/audio/grenade-launcher-daniel_simon.mp3");
  gameState.gameObjectList.push(gameState.advanceSound);

  gameState.ballList =  createGroup();
  gameState.gameObjectList.push(gameState.ballList);

  gameState.staticObjectGroup = createGroup();
  gameState.gameObjectList.push(gameState.staticObjectGroup);

  gameState.ballGroupMaxSize = 5;
  gameState.setupBallGameObjects = function()
  {
    for(var i = 0; i<gameState.ballGroupMaxSize;i++)
    {
      var ball = createBall();
      ball.cull = true;

      gameState.ballList.childObjectList.push(ball);
    }
  }
  gameState.setupStaticGameObjects = function()
  {
    var t = new Random(Date.now());
    for(var i = 0; i<10;i++)
    {
      for(var j = 0; j<5;j++)
      {
        var r = t.nextDouble();

        if(r>0.5)
        {
          var ii = -0.45+i*.1;
          var jj = 0+j*.1;
          gameState.staticObjectGroup.childObjectList.push(createStaticObject(ii,jj,0.1,0.1,"staticImage"+i+"x"+j,game.gameRenderer.staticImages[staticObjectCount % game.gameRenderer.staticImageCount]));
          //return;
        }

      }
    }
  }

  gameState.switchGameStateIn = function()
  {
    initTime=Date.now();
    this.staticObjectGroup.childObjectList = [];
    this.setupStaticGameObjects();


  }
  gameState.switchGameStateOut = function()
  {
    for(var j = 0; j < gameState.staticObjectGroup.childObjectList.length; j++ )
    {

      var staticObject = gameState.staticObjectGroup.childObjectList[j];
      staticObject.hitCount = 0;
      staticObject.cull = false;
    }
    for(var i = 0; i<gameState.ballGroupMaxSize;i++)
    {
      var ball = this.ballList.childObjectList[i];
      ball.cull = true;


    }
    this.resetBalls();
  }
  gameState.aimer = new GameObject();
  gameState.gameObjectList.push(gameState.aimer);
  gameState.aimer.position.set(0,-0.5);
  gameState.aimer.to = createPoint2d(0,0);
  gameState.aimer.visible = false;


  gameState.previousSomeBallsInPlayState = false;
  gameState.isSomeBallsInPlayState = false;
  gameState.allowFire = true;

  gameState.aimer.render = function(gameObject,gameRenderer)
  {
    if(!gameObject.visible)return;

    var posX = gameRenderer.gameToCanvasX(gameObject.position.x);
    var posY = gameRenderer.gameToCanvasY(gameObject.position.y);
    var toX = gameRenderer.gameToCanvasX(gameObject.to.x);
    var toY = gameRenderer.gameToCanvasY(gameObject.to.y);
    var context = gameRenderer.context;
    context.strokeStyle="#FF00FF";
    context.beginPath();
      context.moveTo(posX, posY);
      context.lineTo(toX, toY);
    //context.rect(posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
    context.stroke();
    context.closePath();

  }



  gameState.beforeAdvance = function(time)
  {
    if(this.isGameFinished())
    {
      this.handleGameFinished();
      return;

    }

    //------------
    this.previousSomeBallsInPlayState = this.isSomeBallsInPlayState;
    this.isSomeBallsInPlayState = this.isSomeBallsInPlay();
    if(!this.isSomeBallsInPlayState)
    {
      if(this.previousSomeBallsInPlayState )
      {
        this.resetBalls();
        this.advanceStaticObjects();
      }
      else
      {
        this.allowFire = true;
      }
    }
    else
    {
      this.allowFire = false;
      this.checkAndHandleHits();
    }
    //------------


    this.handleBallChangeDirection();



  }
  gameState.handleBallChangeDirection = function(){
    for(var i = 0; i < this.ballList.childObjectList.length; i++ )
    {
      var ball = this.ballList.childObjectList[i];
      ball.changeDirection(0.5,0.5);
    }
  }
  var initTime = Date.now();
  gameState.isGameFinished = function(){
    // var diff = (Date.now() - initTime)/1000;
    // if( diff > 2)
    //   {
    //   return true;
    //   }


    return this.isAllStaticObjectsDestroyed() 
      || this.isStaticObjectAtFinishLine();


  }
  gameState.isStaticObjectAtFinishLine = function()
  {

    for(var j = 0; j < gameState.staticObjectGroup.childObjectList.length; j++ )
    {
      var staticObject = gameState.staticObjectGroup.childObjectList[j];

      if(!staticObject.cull && staticObject.position.y < -0.4)
      {
        return true;
      }
    }
  }
  gameState.handleGameFinished = function()
  {
    game.switchGameState(game.gameWrapUp);
  }
  gameState.isAllStaticObjectsDestroyed = function()
  {
    var allStaticObjectsDestroyed = true;
    for(var j = 0; j < gameState.staticObjectGroup.childObjectList.length; j++ )
    {
      var staticObject = gameState.staticObjectGroup.childObjectList[j];

      if(!staticObject.cull)
      {
        allStaticObjectsDestroyed = false;
        break;
      }
    }
    return allStaticObjectsDestroyed;
  }

  gameState.checkAndHandleHits = function()
  {
    //check for hits
    for(var i = 0; i < this.ballList.childObjectList.length; i++ )
    {
      var ball = this.ballList.childObjectList[i];
      if(ball.cull)continue;
      var intersectsCount = 0;
      var closestStaticObject = null;
      var closestBallObject = null;
      for(var j = 0; j < this.staticObjectGroup.childObjectList.length; j++ )
      {

        var staticObject = this.staticObjectGroup.childObjectList[j];
        if(staticObject.cull || staticObject.fuseOn) continue;



        if (staticObject.intersects(ball.position,ball.velocity))
        {
          intersectsCount++
          if(closestStaticObject!=null)
          {
            if(staticObject.t < closestStaticObject.t)
            {
              closestStaticObject = staticObject
              closestBallObject = ball;
            }
          }
          else
          {
            closestStaticObject = staticObject;
            closestBallObject = ball;
          }


        }
      }
      if(closestStaticObject!=null)
      {

        if(closestStaticObject.dirY != 0)
        {
          ball.velocity.y = -ball.velocity.y;
        }
        if(closestStaticObject.dirX != 0)
        {
          ball.velocity.x = -ball.velocity.x;
        }

        if(closestStaticObject.hitCount > 5)
        {

          //closestStaticObject.setFuse(20);
          this.handleMaxHits(closestStaticObject);


        }
        else
        {
          closestStaticObject.hitCount++;
        }

        this.handleBallHit(ball);

        //if(closestStaticObject)
      }


    }
  }
  gameState.advanceStaticObjects = function()
  {
    gameState.advanceSound.play();
    for(var j = 0; j < this.staticObjectGroup.childObjectList.length; j++ )
    {

      var staticObject = this.staticObjectGroup.childObjectList[j];
      staticObject.position.y -= 0.05;
    }

  }
  gameState.isSomeBallsInPlay = function()
  {
    var ret = false;

    for(var i = 0; i < gameState.ballList.childObjectList.length; i++ )
    {
      var ball = gameState.ballList.childObjectList[i];
      if(!ball.cull)
      {
        ret = true;
      }

    }


    return ret;
  }

  gameState.resetBalls = function()
  {
    for(var i = 0; i < gameState.ballList.childObjectList.length; i++ )
    {
      var ball = gameState.ballList.childObjectList[i];
      ball.reset();

    }
  }





  gameState.handleMaxHits = function(closestStaticObject)
  {
    closestStaticObject.setFuse(20);
    closestStaticObject.destroySound.play();
    this.addScore();
  }
   
  gameState.aim = function(posX,posY)
  {
    var aimer = game.gameState.aimer;

    //aimer.visible = true;
    aimer.to.set(posX,posY);

  }
  gameState.startAim = function(posX,posY)
  {
    var aimer = game.gameState.aimer;
    aimer.visible = true;
    aimer.to.set(posX,posY);

  }
  gameState.fire = function(posX,posY)
  {
    if(game.gameState.allowFire)
    {
      console.log("fire:("+posX+","+posY+")")
      //game.gameState.gameObjectList.push(ball);
      var aimer = game.gameState.aimer;
      aimer.to.set(posX,posY);
      aimer.visible = false;

      game.gameState.launchX = aimer.to.x - aimer.position.x;
      game.gameState.launchY = aimer.to.y - aimer.position.y;
      game.gameState.launch();

      for(var i = 0; i<5 ; i++)
      {
        setTimeout(game.gameState.launch,i * 200);
      }			
    }
  }
  gameState.launch = function()
  {

    for(var i = 0; i<game.gameState.ballGroupMaxSize;i++)
    {			
      var ball = game.gameState.ballList.childObjectList[i];
      //console.log("x: "+ball.name);
      if(ball.cull)
      {
        ball.playLaunchSound();

        ball.cull = false;
        ball.reset();
        ball.velocity.x = game.gameState.launchX;
        ball.velocity.y = game.gameState.launchY;

        ball.velocity.normalize().scale(0.01);
        break;
      }
    }

  }
  gameState.setupScoreObjects = function()
  {
    this.score = 0;
    var so = createTextObject2d("Score: 0");
    so.scaleWidth = true;
    so.size.set2(0.3,0.1);
    so.position.set2(-0.5 + (so.size.x/2),0.5 - (so.size.y/2));
    this.scoreObject = so;
    this.addGameObject(so);
  }
  gameState.setup = function()
  {		
    gameState.setupStaticGameObjects();
    gameState.setupBallGameObjects();
    gameState.setupScoreObjects();
  }
  gameState.addScore = function()
  {
    this.score++;
    this.scoreObject.text = "Score: "+this.score;
  }
  gameState.setScore = function()
  {

  }

  return gameState;

}


*/