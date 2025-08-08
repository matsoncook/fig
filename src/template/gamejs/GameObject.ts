export default class GameObject {

  gameObjectType : any;
  name : string = "";
  childObjectList : GameObject[] = [];
  previousTime :number = 0;

  position = createPoint2d(0,0);
  size =  createPoint2d(0,0);	
  velocity = createPoint2d(0,0);//Should be direction Vector?
  speedUnitsPerSec = 0;
  timeScaledVelocity = new Point2d();//Should be velocity units per sec?
  bounds = createPoint2d(0,0);
  rect = new RectangleCentered2d(0,0,0,0);
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

  this.addChildObject = function(gameObject)
  {
    this.childObjectList.push(gameObject);
    gameObject.parent = this;
  }
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



  this.doRender =  function(gameObject,gameRenderer)
  {
    this.render(gameObject,gameRenderer);
    for(var i = 0; i < this.childObjectList.length; i++)
    {
      var childGameObject = this.childObjectList[i];
      childGameObject.doRender(childGameObject,gameRenderer);
    }
  }

  //override this
  this.render =  function(gameObject,gameRenderer)
  {

  }

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
  //replace this one
  this.beforeAdvance = function(time)
  {

  }
  //replace this one
  this.afterAdvance = function(time)
  {

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
  this.removeFromParent = function()
  {
    if(this.parent != null)
    {
      var index = this.parent.childObjectList.indexOf(this);
      if(index >= 0)
      {
        this.parent.childObjectList.splice(index, 1);
      }

    }
  }
  */
  advance(time : number)
  {
    /*
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
    */
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
