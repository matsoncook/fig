import GameObject from "../template/gamejs/GameObject";
import GameRenderer from "../template/gamejs/GameRenderer";
import Random from "../transform/Random";
import Stepper from "../transform/Stepper";

export default class StaticObject extends GameObject
{
  static random = Random.createRandom();
  skewStepper : Stepper = new Stepper(0,0,0);

  staticImage: HTMLImageElement | null = null;
  verticalScaleStepper = new Stepper(0.8,1,0.01);
  
  static createStaticObject(posX: number, posY: number, sizeX: number, sizeY: number, name: string, staticImage: HTMLImageElement) : StaticObject {
    var staticObject = new StaticObject(1,name);

    staticObject.size.set(sizeX,sizeY);
    staticObject.position.set(posX,posY);
    staticObject.hitCount=0;
    staticObject.staticImage = staticImage;

    //TODO - remove this?
    staticObject.verticalScaleStepper = new Stepper(0.8,1,0.01);
    //TODO
    staticObject.verticalScaleStepper.current = .7+StaticObject.random.nextDouble()/3.3;
    staticObject.skewStepper = new Stepper(-0.1,.1,StaticObject.random.nextDouble()/50);
    staticObject.skewStepper.current = -0.1+StaticObject.random.nextDouble()/5;
    
    return staticObject;
  }
  render(gameRenderer: GameRenderer)
  {
    var context = gameRenderer.context;
    var posX = gameRenderer.gameToCanvasX(this.position.x);
    var posY = gameRenderer.gameToCanvasY(this.position.y);
    var sizeX = gameRenderer.gameToCanvasSizeX(this.size.x);
    var sizeY = gameRenderer.gameToCanvasSizeY(this.size.y);
    var halfSizeX = sizeX/2;
    var halfSizeY = sizeY/2;


    if(!this.cull)
    {


      if(this.fuseOn)
      {
        var fade = this.fuse/this.fuseCount;
        //TODO this needs uncommenting
        //drawImageCenteredFaded(context,gameRenderer.boomRed,posX,posY,sizeX,sizeY,fade);

        
        //context.drawImage(game.gameRenderer.boomRed,posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
      }
      else
      {
  			// var posX = gameRenderer.gameToCanvasX(this.position.x - this.size.x/2);
     //    var posY = gameRenderer.gameToCanvasY(this.position.y - this.size.y/2);
     //    var sizeX = gameRenderer.gameToCanvasSizeX(this.size.x);
     //    var sizeY = gameRenderer.gameToCanvasSizeY(this.size.y);
        context.save();


        var vscale = this.verticalScaleStepper.next();
        var posY1 = posY + (1 - sizeY * vscale) +halfSizeY;

        var vskew = this.skewStepper.next();
        //posX = posX + (1 - sizeX * vskew);
        //posX = posX - (1 - sizeX * vskew);
        var posX1 = posX - ( sizeX * vskew) -halfSizeX;

        context.setTransform(1,0,vskew,vscale,posX1,posY1);

        //context.translate(-halfSizeX,halfSizeY);
        context.drawImage(this.staticImage!,0,0,sizeX,sizeY);

        context.restore();


        /*posX = gameRenderer.gameToCanvasX(gameObject.position.x);
        posY = gameRenderer.gameToCanvasY(gameObject.position.y);
        crossHairs01(context,posX,posY,sizeX,sizeY);
        drawRectCentered(context,posX,posY,sizeX,sizeY);*/
      }
    }
    //Debug
    //crossHairs01(context,posX,posY,sizeX,sizeY);
    //drawRectCentered(context,posX,posY,sizeX,sizeY);


    }
 
/*
function createStaticObject(posX,posY,sizeX,sizeY,name,staticImage,preInitialise)
{

  var staticObject = new GameObject(1,name);
  var preInit = preInitialise;
  if(preInit==null)
  {
    preInit = function(staticObject)
    {
      staticObject.destroySound = createAudioObject("/audio/grenade-launcher-daniel_simon.mp3");
			// ball.cullSound = createAudioObject("/audio/Water Droplet-SoundBible.com-854529508.mp3");
   //    ball.hitSound = createAudioObject("/audio/Water Drop-SoundBible.com-2039669379.mp3");
		
    }
  }
  preInit(staticObject);

  staticObject.addChildObject(staticObject.destroySound);

  staticObject.size.set(sizeX,sizeY);
  staticObject.position.set(posX,posY);
  staticObject.hitCount=0;
  staticObject.staticImage = staticImage;
  staticObjectCount++;
  staticObject.verticalScaleStepper = new Stepper(0.8,1,0.01);
  staticObject.verticalScaleStepper.current = .7+random.nextDouble()/3.3;
  staticObject.skewStepper = new Stepper(-0.1,.1,random.nextDouble()/50);
  staticObject.skewStepper.current = -0.1+random.nextDouble()/5;
  staticObject.render = function(gameObject,gameRenderer)
  {
    // if(gameObject.cull || !gameObject.visible)
    // {
    //   return;
    // }


    var context = gameRenderer.context;
    var posX = gameRenderer.gameToCanvasX(gameObject.position.x);
    var posY = gameRenderer.gameToCanvasY(gameObject.position.y);
    var sizeX = gameRenderer.gameToCanvasSizeX(gameObject.size.x);
    var sizeY = gameRenderer.gameToCanvasSizeY(gameObject.size.y);
    var halfSizeX = sizeX/2;
    var halfSizeY = sizeY/2;

    if(!gameObject.cull)
    {


      if(gameObject.fuseOn)
      {
        var fade = gameObject.fuse/gameObject.fuseCount;

        drawImageCenteredFaded(context,game.gameRenderer.boomRed,posX,posY,sizeX,sizeY,fade);
        //context.drawImage(game.gameRenderer.boomRed,posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
      }
      else
      {
				// var posX = gameRenderer.gameToCanvasX(gameObject.position.x - gameObject.size.x/2);
    //     var posY = gameRenderer.gameToCanvasY(gameObject.position.y - gameObject.size.y/2);
    //     var sizeX = gameRenderer.gameToCanvasSizeX(gameObject.size.x);
    //     var sizeY = gameRenderer.gameToCanvasSizeY(gameObject.size.y);
        context.save();


        var vscale = staticObject.verticalScaleStepper.next();
        var posY1 = posY + (1 - sizeY * vscale) +halfSizeY;

        var vskew = gameObject.skewStepper.next();
        //posX = posX + (1 - sizeX * vskew);
        //posX = posX - (1 - sizeX * vskew);
        var posX1 = posX - ( sizeX * vskew) -halfSizeX;

        context.setTransform(1,0,vskew,vscale,posX1,posY1);

        //context.translate(-halfSizeX,halfSizeY);
        context.drawImage(gameObject.staticImage,0,0,sizeX,sizeY);

        context.restore();


        // posX = gameRenderer.gameToCanvasX(gameObject.position.x);
        // posY = gameRenderer.gameToCanvasY(gameObject.position.y);
        // crossHairs01(context,posX,posY,sizeX,sizeY);
        // drawRectCentered(context,posX,posY,sizeX,sizeY);
      }
    }
    //Debug
    //crossHairs01(context,posX,posY,sizeX,sizeY);
    //drawRectCentered(context,posX,posY,sizeX,sizeY);


  }
  staticObject.handleFuseOut = function()
  {
    this.cull=true;
  }
  staticObject.t = 2;
  staticObject.dirX = 0;
  staticObject.dirY = 0;
  staticObject.intersects = function(position, velocity)
  {
    this.t = 2;
      var ppv = clonePoint2d(position).add(velocity);
    var l = new LineSegmentIntersecter();

    l.p0 = position;
    l.p1 = ppv;

    l.pp0 = new Point2d();
    l.pp1 = new Point2d();

    var hsx = this.size.x / 2;
    var hsy = this.size.y / 2;

    var x = this.position.x;
    var y = this.position.y;

    //repeat this
    l.pp0.set(x+hsx,y+hsy);
    l.pp1.set(x-hsx,y+hsy);

    if(velocity.y < 0 && l.intersects())
    {
      //console.log(l.log());
      if(l.t<this.t)
      {
        this.t = l.t;
        this.dirX = 0;
        this.dirY = 1;
      }
    }
    //to here

    //repeat this
    l.pp0.set(x+hsx,y-hsy);
    l.pp1.set(x-hsx,y-hsy);

    if(velocity.y > 0 && l.intersects())
    {
      //console.log(l.log());
      if(l.t<this.t)
      {
        this.t = l.t;
        this.dirX = 0;
        this.dirY = -1;
      }
    }
    //to here

    //repeat this
    l.pp0.set(x+hsx,y-hsy);
    l.pp1.set(x+hsx,y+hsy);

    if(velocity.x < 0 && l.intersects())
    {
      //console.log(l.log());
      if(l.t<this.t)
      {
        this.t = l.t;
        this.dirX = +1;
        this.dirY = 0;
      }
    }
    //to here


    //repeat this
    l.pp0.set(x-hsx,y-hsy);
    l.pp1.set(x-hsx,y+hsy);

    if(velocity.x > 0 && l.intersects())
    {
      //console.log(l.log());
      if(l.t<this.t)
      {
        this.t = l.t;
        this.dirX = -1;
        this.dirY = 0;
      }
    }
    //to here
    return this.t >= 0 && this.t <= 1;


  }

  return staticObject;
}
*/