function createBounds2(sizeX,sizeY)
{
	var bounds = new Bounds2d();
	var hx = sizeX/2;
	var hy = sizeY/2;
	
	bounds.x = hx;
	bounds.nx = hx;
	bounds.y=hy;
	bounds.ny=hy;
	bounds.sizeX = sizeX;
	bounds.sizeY = sizeY;
	bounds.halfSizeX = hx;
	bounds.halfSizeY = hy;
	
	
	return bounds;
}

function cloneBounds(bounds2d)
{
	var bounds = new Bounds2d();
	
	
	bounds.x = bounds2d.x;
	bounds.nx = bounds2d.nx;
	bounds.y=bounds2d.y;
	bounds.ny=bounds2d.ny;
	bounds.sizeX = bounds2d.sizeX;
	bounds.sizeY = bounds2d.sizeY;
	bounds.halfSizeX = bounds2d.halfSizeX;
	bounds.halfSizeY = bounds2d.halfSizeY;
	
	
	return bounds;
}



function Bounds2d()
{
	var x;
	var nx;
	var y;
	var ny;
	var sizeX;
	var sizeY;
	var halfSizeX;
	var halfSizeY;
	
	this.set2 = function(sizeX,sizeY)
	{
		
		var hx = sizeX/2;
		var hy = sizeY/2;
		
		this.x = hx;
		this.nx = hx;
		this.y=hy;
		this.ny=hy;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.halfSizeX = hx;
		this.halfSizeY = hy;
		
		
		return this;
	}
}