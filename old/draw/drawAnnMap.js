function drawAnnMap(context,matrix2d)
{
	this.width = context.getWidth();
	this.height = context.getHeight();
	this.spanX = matrix2d.sizeX;
	this.spanY = matrix2d.sizeY;
	//this.sizeX = 
	//var 
	
	
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
}