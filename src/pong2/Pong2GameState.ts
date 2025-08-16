import Background from "../object2d/Background";
import GroupObject from "../object2d/GroupObject";
import GameState from "../template/gamejs/GameState";
import Ball from "./Ball";

export default class Pong2GameState extends GameState
{
  ballList =  new GroupObject("ball-list");
  ballGroupMaxSize = 5;
  static createPong2GameState()
  {

    var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
    var gameState = new Pong2GameState(bg);
    //Done in base class
    //gameState.gameObjectList.push(gameState.staticObjectGroup);
    


  }

  constructor( private backgroundObject : Background)
  {
      super();

      this.addGameObject(backgroundObject);
      this.addGameObject(this.ballList);
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
}

/*

function createStaticImage(path)
{
  var i = new Image();
  i.src = path;
  return i;
}

function createGroup()
{
  var group = new GameObject(0,"Group");

  return group;
}
var staticObjectCount = 0;
var random  = new Random(Date.now());






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
  gameState.handleBallHit = function(ball)
  {
    ball.hitSound.play();

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