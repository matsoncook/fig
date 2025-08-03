function createRectangle2d(x,y,width,height)
{
	var rect = new Rectangle2d();
	rect.x = x;
	rect.y = y;
	rect.width = width;
	rect.height = height;
	
	return rect;
	
}

function createRectangleCentered2d(x,y,width,height)
{
	var rect = new RectangleCentered2d(x,y,width,height);
	
	return rect;
	
}


function Rectangle2d()
{
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;	

	this.intersects = function(point2d)
	{
		var px = point2d.x;
		var py = point2d.y;
		var ret = false;
		if(between(px,x,x+width)
				&& between(py,y,y+height))
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