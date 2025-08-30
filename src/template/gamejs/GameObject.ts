import McImage from "../../image/McImage";
import { Point2d } from "../../transform/Point2d";
import RectangleCentered2d from "../../transform/RectangleCentered2d";
import GameRenderer from "./GameRenderer";
import WorldObjectType from "./WorldObjectType";

export default class GameObject {

  //gameObjectType : any;
  //name : string = "";
  childObjectList: GameObject[] = [];
  previousTime: number = 0;

  position = Point2d.createPoint2d(0, 0);
  size = Point2d.createPoint2d(0, 0);
  velocity = Point2d.createPoint2d(0, 0); //Should be direction Vector?
  speedUnitsPerSec = 0;
  timeScaledVelocity = new Point2d(); //Should be velocity units per sec?
  bounds = Point2d.createPoint2d(0, 0);
  rect = new RectangleCentered2d(0, 0, 0, 0);

  fuseOn: boolean = false;
  fuseCount: number = 0;
  fuse: number = 0;

  cull: boolean = false;
  visible: boolean = true;
  hitCount: number = 0;

  points: number = 0;

  usingViewPort: boolean = false;
  viewPort: any = null;

  loaded: boolean = false;
  mcImage: McImage | null = null;

  stage:number =0;

  parent : GameObject | null = null;
  constructor(
    private gameObjectType: WorldObjectType,
    private name: string,
  ) {}
  /*
  (gameObjectType,name)
  this.gameObjectType = gameObjectType;
  this.name = name;
  this.childObjectList = [];
  this.previousTime = 0;

  this.position = createPoint2d(0,0);
  this.size =  createPoint2d(0,0);	
  this.velocity = createPoint2d(0,0);//Should be direction Vector?
  this.speedUnitsPerSec = 0;
  this.timeScaledVelocity = new Point2d();//Should be velocity units per sec?
  this.bounds = createPoint2d(0,0);
  this.rect = new RectangleCentered2d(0,0,0,0);

  this.fuseOn = false;
  this.fuseCount = 0;
  this.fuse = 0;

  this.cull = false;
  this.visible = true;
  this.hitCount = 0;

  this.points = 0;

  this.usingViewPort = false;
  this.viewPort = null;
*/
  addChildObject(gameObject : GameObject)
  {
    this.childObjectList.push(gameObject);
    gameObject.parent = this;
  }
  /*
  this.getTimeDeltaMs = function()
  {
    var now = Date.now();
    if(this.previousTime == 0){ this.previousTime = now;}
    var diff = now - this.previousTime;
    this.previousTime = now;
    return diff;
  }
  this.getTimeDeltaSecs = function()
  {
    var now = Date.now();
    if(this.previousTime == 0){ this.previousTime = now;}
    var diff = (now - this.previousTime)/1000;
    this.previousTime = now;
    return diff;
  }

  this.getTimeScaledVelocity = function()
  {
    this.timeScaledVelocity.set1(this.velocity);
    var getTimeDeltaSecs = this.getTimeDeltaSecs();	
    var timeScaledSpeed = this.speedUnitsPerSec*getTimeDeltaSecs;
    this.timeScaledVelocity.scale(timeScaledSpeed);
    return this.timeScaledVelocity;
  }

*/

  doRender(gameObject: GameObject, gameRenderer: GameRenderer) {
    this.render(gameRenderer);
    for (var i = 0; i < this.childObjectList.length; i++) {
      var childGameObject = this.childObjectList[i];
      childGameObject.doRender(childGameObject, gameRenderer);
    }
  }

  //override this
  render(gameRenderer: GameRenderer) {
    
  }

  setFuse(fuse : number)
  {
    this.fuse = fuse;
    this.fuseCount = fuse;
    this.fuseOn = true;
  }
  
  /*
  this.intersect = function(invader)
  {

    var sizeX = (invader.size.x + this.size.x)/2;
    var sizeY = (invader.size.y + this.size.y)/2;
    var distX = Math.abs(invader.position.x - this.position.x);
    var distY = Math.abs(invader.position.y - this.position.y);

    if(distX < sizeX && distY < sizeY)
    {
      return true;
    }
    return false;
  }
  this.pointInBounds = function(point2d)
  {

    this.rect.set(this.position.x,this.position.y,this.size.x,this.size.y);
    return this.rect.intersectsPoint2d(point2d);

  }

  this.setFuse = function(fuse)
  {
    this.fuse = fuse;
    this.fuseCount = fuse;
    this.fuseOn = true;
  }
  this.handleFuseOut = function()
  {
    this.velocity.set(0,0);
  }
  this.setBounds = function(boundsX,boundsY)
  {
    this.bounds.set(boundsX,boundsY);
  }
  this.isOutOfBounds = function()
  {
    return false;
  }
 
  this.traverseChildren = function(traverseFunction,reverse)
  {
    if(!reverse)
    {
      for(var i = 0, len = this.childObjectList.length; i < len; i++)
      {
        var gameObject = this.childObjectList[i];
        traverseFunction(gameObject);
      }
    }
    else
    {
      for(var i = this.childObjectList.length-1; i >= 0; i--)
      {
        var gameObject = this.childObjectList[i];
        traverseFunction(gameObject);
      }
    }

  }

  this.gameObjectRenderer = {
    render : function(gameObject,gameRenderer)
    {

    }
  }
  */
  removeFromParent()
  {
    if(this.parent)
    {
      var index = this.parent.childObjectList.indexOf(this);
      if(index >= 0)
      {
        this.parent.childObjectList.splice(index, 1);
      }

    }
  }
  
  advance(time: number) {
  
    if(this.fuseOn)
    {
      this.fuse = this.fuse - 1;
      if(this.fuse<0)
      {
        this.fuseOn = false; 
        this.handleFuseOut();
      }
    }
    this.beforeAdvance(time);
    for(var i = 0; i < this.childObjectList.length; i++)
    {
      var gameObject = this.childObjectList[i];
      gameObject.advance(time);
    }
    this.afterAdvance(time);
    this.previousTime = time;
  
  }

   //replace this one
  beforeAdvance(time: number)
  {

  }
  //replace this one
  afterAdvance(time: number)
  {

  }

  handleFuseOut()
  {
    this.velocity.set(0,0);
  }
  /*

  this.setViewPort = function(viewPort)
  {
    this.viewPort = viewPort;
    this.usingViewPort = true;
    return this;
  }

  this.log = function()
  {
    return "name:" + name + " pos:(" + this.position.x + "," + this.position.y + ") vel:("+ this.velocity.x + "," + this.velocity.y + ")";
  }

  this.setName = function(name)
  {
    this.name = name;
    return this;

  }
  */
}
