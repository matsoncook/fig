function RectangleCentered2d(x,y,boundsX,boundsY)
{
  this.x = x;
  this.y = y;
  this.boundsX = boundsX;
  this.boundsY = boundsY;	
  this.halfBoundsX = Math.floor(boundsX/2);
  this.halfBoundsY = Math.floor(boundsY/2);	
  this.set = function(x,y,boundsX,boundsY)
  {
    this.x = x;
    this.y = y;
    this.boundsX = boundsX;
    this.boundsY = boundsY;	
    this.halfBoundsX = boundsX/2;
    this.halfBoundsY = boundsY/2;	
  }


  this.intersectsPoint2d = function(point2d)
  {
    var px = point2d.x;
    var py = point2d.y;
    var ret = false;
    if(between(px,this.x-this.halfBoundsX,this.x+this.halfBoundsX)
        && between(py,this.y-this.halfBoundsY,this.y+this.halfBoundsY))
    {
      ret = true;
    }
    return ret;
  }
  var between = function(px,fx,tx)
  {
    var ret = false;
    if((px>fx && px <tx)
        || (px < fx && px > tx))
    {
      ret = true;
    }
    return ret;

  }

}