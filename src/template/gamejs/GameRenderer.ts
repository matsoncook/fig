export default class GameRenderer {
  widthHeightRatio = 1;
  width : number = 100;
  height : number = 100;
  borderRatio = 0.05;
  context : CanvasRenderingContext2D | null = null;

  constructor(private canvas : HTMLCanvasElement,private controlCanvas : HTMLCanvasElement)
  {
    this.context = canvas.getContext('2d');
  }

  /*
  this.sizeX = 1;
  this.sizeY = 1;
  this.canvas = null;
  this.context = null;
    this.width = 0;
    this.height = 0;

  this.widthHeightRatio = 1;
  this.borderRatio = 0.05;

  var that = this;

  this.fontSize = 50;
  this.displayFont = "" + this.fontSize + "px Arial";
  this.displayModeFont = "8px Arial";
  this.backgroundImage = new Image();

  this.viewPort = null;
  this.usingViewPort = false;


  this.setViewPort = function(viewPort)
  {
    this.viewPort = viewPort;
    this.usingViewPort = true;
  }

  this.setSize1 = function(windowInnerWidth,windowInnerHeight)
    {
        var width = windowInnerWidth;
        var height = windowInnerHeight;
        //width = Math.floor( width - width );
        //height =  Math.floor( height - height*this.borderRatio );

        this.widthHeightRatio = width/height;


       // if(width*this.widthHeightRatio>height)
       //  {
       //      width = Math.floor(height/this.widthHeightRatio);
       //  }
       //  else
       //  {
       //      height = width*this.widthHeightRatio;
       //  }



        this.width = width;
        this.height = height;
        this.canvas.width  = width;
        this.canvas.height = height;
  }
  */
    setSize(windowInnerWidth : number,windowInnerHeight: number)
    {
        var width = windowInnerWidth;
        var height = windowInnerHeight;



        if(width*this.widthHeightRatio>height)
        {
            width = Math.floor(height/this.widthHeightRatio);
        }
        else
        {
            height = width*this.widthHeightRatio;
        }
        width = width - width*this.borderRatio;
        height = height - height*this.borderRatio;


        this.width = width;
        this.height = height;
        this.canvas.width  = width;
        this.canvas.height = height;
  }
  /*
  this.setup = function()
  {

  }
  this.render = function(time,context,gameObjectList)
  {
    this.time = time;

    this.collectStats();

    //context.clearRect(0, 0, gameRenderer.width, gameRenderer.height);

    if(gameObjectList != null)
    {
      for(var i = 0; i < gameObjectList.length; i++ )
        {
        var gameObject = gameObjectList[i];
        if(gameObject.cull)
        {
          //TODO:GarbageCollect
          //garbage collect
          this.renderGameObject(gameObject,context);
        }
        else
        {
          this.renderGameObject(gameObject,context);
        }
        //gameObject.gameObjectRenderer.render(context);


        }
    }


    //this.postRender();

  };

  this.renderGameObject = function(gameObject,context)
  {
    gameObject.doRender(gameObject,this);

  };

  this.gameToCanvasP = function(fromPoint,toPoint)
  {
    toPoint.x = this.gameToCanvasX(fromPoint.x);
    toPoint.y = this.gameToCanvasY(fromPoint.y);

    return toPoint;

  }

  this.gameToCanvasX = function(gameX)
  {
    var halfSizeX = this.sizeX/2;
    var px = (gameX + halfSizeX) * this.width;
    return px;
  }
  this.gameToCanvasY = function(gameY)
  {
    var halfSizeY = this.sizeY/2;
    var py = (halfSizeY - gameY) * this.height;
    return py;
  }
  this.gameToCanvasSizeP = function(fromPoint,toPoint)
  {
    toPoint.x = this.gameToCanvasSizeX(fromPoint.x);
    toPoint.y = this.gameToCanvasSizeY(fromPoint.y);

    return toPoint;

  }
  this.gameToCanvasSizeX = function(gameSizeX)
  {
    var px = gameSizeX * this.width;
    return px;
  }
  this.gameToCanvasSizeY = function(gameSizeY)
  {
    var px = gameSizeY * this.height;
    return px;
  }

  this.canvasToGameX = function(canvasX)
  {
    var halfSizeX = this.sizeX/2;

    var gameX = (canvasX/this.width) - halfSizeX
    return gameX;
  }
  this.canvasToGameY = function(canvasY)
  {
    var halfSizeY = this.sizeY/2;

    var gameY =  halfSizeY - (canvasY / this.height) ;
    return gameY;
  }



  this.collectStats = function()
  {

  }


  */
}