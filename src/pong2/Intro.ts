import Background from "../object2d/Background";
import Game from "../template/gamejs/Game";
import GameObject from "../template/gamejs/GameObject";
import GameState from "../template/gamejs/GameState";

export default class Intro{
  gameState = new GameState();
  constructor(private game : Game)
  {
    
  }
  createGameIntro()
  {
    //var gameState = new GameState();
    this.gameState.initialise = function()
    {
      var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
      this.addGameObject(bg); 

      //This is now done in the gameState constructor
      //this.staticObjectGroup = new GameObject(0,"Group");
      //this.gameObjectList.push(this.staticObjectGroup);

      // this.backgroundMusic = createAudioObject("/audio/sa/cut2.mp3");
      // this.backgroundMusic.play(true);
      // this.backgroundMusic.loop(true);
      // this.gameObjectList.push(this.backgroundMusic);
    }
  }

  setupGameObjects()
      {

        for(var i = 0; i<this.game.gameRenderer.staticImageCount;i++)
        {
          var so = createStaticObject(0,0,0.2,0.2,"staticImage"+i,this.game.gameRenderer.staticImages[i]);

          this.gameState.staticObjectGroup.childObjectList.push(so);


        }
/*
        var to = createTextObject2d("Play");
        to.setBold(true);
        to.size.set2(0.1,0.15);
        to.position.set2(0,-0.15);
        //to.setFontArial();
        to.setFontComicSansMS();

        this.gameObjectList.push(to);


        var toh = createTextObject2d("Pumpkin Patch");
        toh.setBold(true);
        toh.size.set2(0.1,0.15);
        toh.position.set2(0,0.4);
        //toh.setFontArial();
        toh.setFontComicSansMS();

        this.gameObjectList.push(toh);
        */
      }
  /*
  function createGameIntro()
  {
    var gameState = new GameState();
    gameState.initialise = function()
    {
      var bg = createBackgroundImageObject("images/flowers/lawn.jpg");
      gameState.addGameObject(bg); 

      this.staticObjectGroup = createGroup();
      this.gameObjectList.push(this.staticObjectGroup);

      this.backgroundMusic = createAudioObject("/audio/sa/cut2.mp3");
      this.backgroundMusic.play(true);
      this.backgroundMusic.loop(true);
      this.gameObjectList.push(this.backgroundMusic);

      this.images = [];
      this.audio = [];


      //To Be prototyped
      // this.isPlaying = true;	
      // this.isPlaying = function()
      // {
      //   return this.isPlaying;
      // }




      this.play = function()
      {		
        this.audio[0].play();
      }

      this.next = function()
      {

      }

      this.stop = function()
      {

      }

      this.render = function()
      {

      }

      this.setupGameObjects = function()
      {

        for(var i = 0; i<game.gameRenderer.staticImageCount;i++)
        {
          var so = createStaticObject(0,0,0.2,0.2,"staticImage"+i,game.gameRenderer.staticImages[i]);

          this.staticObjectGroup.childObjectList.push(so);


        }

        var to = createTextObject2d("Play");
        to.setBold(true);
        to.size.set2(0.1,0.15);
        to.position.set2(0,-0.15);
        //to.setFontArial();
        to.setFontComicSansMS();

        this.gameObjectList.push(to);


        var toh = createTextObject2d("Pumpkin Patch");
        toh.setBold(true);
        toh.size.set2(0.1,0.15);
        toh.position.set2(0,0.4);
        //toh.setFontArial();
        toh.setFontComicSansMS();

        this.gameObjectList.push(toh);
      }
      this.advance1 = 0;
      this.advance = function(now)
      {
        var numberItems = this.staticObjectGroup.childObjectList.length;

        for(var i = 0; i<numberItems;i++)
        {
          var rad = (i/numberItems) * Math.PI*2;
          rad = rad + this.advance1;
          //rad = rad %  Math.PI*2
          //console.log(""+i+" " +rad)

          var x = Math.cos(rad) / 2.5;
          var y = Math.sin(rad) / 4;

          this.staticObjectGroup.childObjectList[i].position.set2(x,y-0.15);


        }
        this.advance1 += 0.005;
      }
      this.switchGameStateOut = function()
      {
        this.backgroundMusic.stop();
      }
      this.setupGameObjects();
    }
    gameState.initialise();	
    return gameState;

  }


  function Intro()
  {
    this.images = [];
    this.audio = [];
    this.play = function()
    {		
      this.audio[0].play();
    }

    this.next = function()
    {

    }
  }
*/
}

function createStaticObject(arg0: number, arg1: number, arg2: number, arg3: number, arg4: string, arg5: HTMLImageElement) : GameObject {
    throw new Error("Function not implemented.");
}
