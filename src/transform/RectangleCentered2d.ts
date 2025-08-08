import { Point2d } from "./Point2d";

export default class RectangleCentered2d
{
  halfBoundsX: number;
  halfBoundsY: number;
  constructor(public x : number,public y  : number,public boundsX  : number, public boundsY  : number)
  {
    this.halfBoundsX = Math.floor(boundsX/2);
    this.halfBoundsY = Math.floor(boundsY/2);	
  }
 

  set(x: number,y: number,boundsX: number,boundsY: number)
  {
    this.x = x;
    this.y = y;
    this.boundsX = boundsX;
    this.boundsY = boundsY;	
    this.halfBoundsX = boundsX/2;
    this.halfBoundsY = boundsY/2;	
  }


  intersectsPoint2d(point2d : Point2d)
  {
    var px = point2d.x;
    var py = point2d.y;
    var ret = false;
    if(this.between(px,this.x-this.halfBoundsX,this.x+this.halfBoundsX)
        && this.between(py,this.y-this.halfBoundsY,this.y+this.halfBoundsY))
    {
      ret = true;
    }
    return ret;
  }
  between(px : number,fx: number,tx: number)
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