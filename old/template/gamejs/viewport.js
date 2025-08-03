function createViewPort7( worldBounds,viewPortWorldMagnification,viewPortWorldPosition,viewPortBounds,viewPortCanvasMagnification,viewPortCanvasPosition,canvasBounds)
{
	var viewPort = new ViewPort();
	viewPort.constructIt = function()
	{
		//Should be
		this.worldBounds = worldBounds;
		
		//Magnification of world from viewport view
		this.viewPortWorldMagnification = viewPortWorldMagnification;
		
		//World position of the center of viewport
		this.viewPortWorldPosition = viewPortWorldPosition;
		
		
		
		this.viewPortBounds = viewPortBounds;
		
		
		//Magnification of canvas from viewport view
		this.viewPortCanvasMagnification = viewPortCanvasMagnification;

		//Canvas position of the center of viewport
		this.viewPortCanvasPosition = viewPortCanvasPosition;
		
		this.canvasBounds = canvasBounds;
		
		

	}
	
	viewPort.constructIt();
	
	
	return viewPort;
}


function createViewPort6( worldBounds,viewPortWorldPosition,viewPortBounds,canvasViewPortMagnification,canvasBounds,canvasPosition)
{
	var viewPort = new ViewPort();
	
	viewPort.worldBounds = worldBounds;
	viewPort.viewPortWorldPosition = viewPortWorldPosition;
	viewPort.viewPortBounds = viewPortBounds;
	
	viewPort.canvasViewPortMagnification = canvasViewPortMagnification;
	
	viewPort.canvasBounds = canvasBounds;
	
	
	
	viewPort.canvasPosition = canvasPosition;
	
	
	return viewPort;
}



function createViewPort4( worldBounds,viewPortWorldPosition,viewPortBounds,canvasBounds)
{
	var viewPort = new ViewPort();
	
	viewPort.worldBounds = worldBounds;
	viewPort.viewPortWorldPosition = viewPortWorldPosition;
	viewPort.viewPortBounds = viewPortBounds;
	
	viewPort.canvasBounds = canvasBounds;
	
	
	return viewPort;
}


function createViewPort3( worldBounds,viewPortWorldPosition,viewPortBounds)
{
	var viewPort = new ViewPort();
	
	viewPort.worldBounds = worldBounds;
	viewPort.viewPortWorldPosition = viewPortWorldPosition;
	viewPort.viewPortBounds = viewPortBounds;
	
	
	return viewPort;
}

function createViewPort1( pviewPort)
{
	var viewPort = new ViewPort();
	
	viewPort.worldBounds = cloneBounds(pviewPort.worldBounds);
	
	viewPort.viewPortBounds = cloneBounds(pviewPort.viewPortBounds);
	viewPort.viewPortWorldPosition = clonePoint2d(pviewPort.viewPortWorldPosition);
	viewPort.canvasViewPortMagnification = clonePoint2d(pviewPort.canvasViewPortMagnification);
	
	viewPort.canvasBounds = cloneBounds(pviewPort.canvasBounds);
	viewPort.canvasPosition = clonePoint2d(pviewPort.canvasPosition);
	
	
	return viewPort;
}



function ViewPort()
{
	
	
	//Should be
	this.worldBounds = createBounds2(10,10);
	
	//Magnification of world from viewport view
	this.viewPortWorldMagnification = createPoint2d(0,0);
	
	//World position of the center of viewport
	this.viewPortWorldPosition = createPoint2d(0,0);
	
	
	
	this.viewPortBounds = createBounds2(1,1);
	
	
	//Magnification of canvas from viewport view
	this.viewPortCanvasMagnification = createPoint2d(1,1);

	//Canvas position of the center of viewport
	this.viewPortCanvasPosition = createPoint2d(0,0);
	
	this.canvasBounds = createBounds2(200,150);
	
	/*
	
	vtcm = vb / cb
	
	position of the center of the viewport on the canvas = vtcp
	center viewport vtcp = cb/2
	
	viewport to canvas c = v * vtcm  + vtcp
	
	*/
	
	
	this.worldBounds = createBounds2(10,10);
	
	this.viewPortBounds = createBounds2(1,1);
	this.viewPortWorldPosition = createPoint2d(0,0);
	this.canvasViewPortMagnification = createPoint2d(1,1);
	
	this.canvasBounds = createBounds2(200,150);
	
	
	//This is the position of the viewport on the canvas
	//This uses html5 canvas X,Y position - it is not centered - to center see createViewPort5
	this.viewPortCanvasPosition = createPoint2d(0,0);
	
	//ViewPort To Canvas------------------------------------------------------------------------- 
	
	this.viewPortToCanvasP = function(fromPoint,toPoint)
	{
		toPoint.x = this.viewPortToCanvasX(fromPoint.x);
		toPoint.y = this.viewPortToCanvasY(fromPoint.y);
		
		return toPoint;
		
	}

	/*this.viewPortToCanvasX = function(viewPortX)
	{
		
		var px = ((viewPortX * this.canvasBounds.sizeX * this.canvasViewPortMagnification.x) + this.canvasBounds.halfSizeX)  + this.canvasViewPortPosition.x;
		return px;
	}
	this.viewPortToCanvasY = function(viewPortY)
	{
		var py = (this.canvasBounds.halfSizeY - (viewPortY * this.canvasBounds.sizeY * this.canvasViewPortMagnification.y))  + this.canvasViewPortPosition.y; 
		return py;
	}*/
	
	this.viewPortToCanvasX = function(viewPortX)
	{
		
		var canvasX = (viewPortX * this.viewPortCanvasMagnification.x)  + this.viewPortCanvasPosition.x;
		return canvasX;
	}
	this.viewPortToCanvasY = function(viewPortY)
	{
		var canvasY = this.viewPortCanvasPosition.y - (viewPortY * this.viewPortCanvasMagnification.y)  ; 
		return canvasY;
	}
	
	//ViewPort To Canvas Size------------------------------------------------------------------
	
	this.viewPortToCanvasSizeP = function(fromPoint,toPoint)
	{
		toPoint.x = this.viewPortToCanvasSizeX(fromPoint.x);
		toPoint.y = this.viewPortToCanvasSizeY(fromPoint.y);
		
		return toPoint;
		
	}
	
	this.viewPortToCanvasSizeX = function(viewPortSizeX)
	{
		var canvasSizeX = viewPortSizeX * this.viewPortCanvasMagnification.x;
		return canvasSizeX;
	}
	this.viewPortToCanvasSizeY = function(viewPortSizeY)
	{
		var canvasSizeY = viewPortSizeY * this.viewPortCanvasMagnification.y;
		return canvasSizeY;
	}
	
	// Canvas To  ViewPort -------------------------------------------------------------------
	
	this.canvasToViewPortX = function(canvasX)
	{
		var viewPortX = ((canvasX - this.viewPortCanvasPosition.x) / this.viewPortCanvasMagnification.x);
		return viewPortX;
	}
	this.canvasToViewPortY = function(canvasY)
	{
		var viewPortY =  (canvasY -this.viewPortCanvasPosition.y)/(- this.viewPortCanvasMagnification.y) ;
		return viewPortY;
	}
	
	// ViewPort To World -------------------------------------------------------------------
	
	this.viewPortToWorldX = function(viewPortX)
	{
		
		var worldX = (viewPortX * this.viewPortWorldMagnification.x) + this.viewPortWorldPosition.x;
		return worldX;
	}
	this.viewPortToWorldY = function(viewPortY)
	{
		var worldY = (viewPortY * this.viewPortWorldMagnification.y) + this.viewPortWorldPosition.y;
		return worldY;
	}

	// World to ViewPort -------------------------------------------------------------------
	
	this.worldToViewPortX = function(worldX)
	{
		
		var viewPortX = ( worldX - this.viewPortWorldPosition.x ) / this.viewPortWorldMagnification.x ;
		return viewPortX;
	}
	this.worldToViewPortY = function(worldY)
	{
		var viewPortY = ( worldY - this.viewPortWorldPosition.y ) / this.viewPortWorldMagnification.y ;
		return viewPortY;
	}
	
	
	// ViewPort to World  Size-------------------------------------------------------------------
	
	this.viewPortToWorldSizeX = function(viewPortSizeX)
	{
		
		var worldSizeX = (viewPortSizeX * this.viewPortWorldMagnification.x );
		return worldSizeX;
	}
	this.viewPortToWorldSizeY = function(viewPortSizeY)
	{
		
		var worldSizeY = (viewPortSizeY * this.viewPortWorldMagnification.y );
		return worldSizeY;
	}
	
    // World to ViewPort Size-------------------------------------------------------------------
	
	this.worldToViewPortSizeX = function(worldX)
	{
		
		var viewPortSizeX = (worldX/this.viewPortWorldMagnification.x);
		return viewPortSizeX;
	}
	this.worldToViewPortSizeY = function(worldY)
	{
		var viewPortSizeY = (worldY/this.viewPortWorldMagnification.y);
		return viewPortSizeY;
	}
	
    // World to canvas -------------------------------------------------------------------
	
	this.worldToCanvasP = function(fromPoint,toPoint)
	{
		var viewPortX = this.worldToViewPortX(fromPoint.x);
		var viewPortY = this.worldToViewPortY(fromPoint.y);

		toPoint.x = this.viewPortToCanvasX(viewPortX);
		toPoint.y = this.viewPortToCanvasY(viewPortY);
		
		return toPoint;
		
	}
	
	this.worldToCanvasX = function(worldX)
	{
		var viewPortX = this.worldToViewPortX(worldX);
		canvasX = this.viewPortToCanvasX(viewPortX);
				
		return canvasX;
		
	}
	this.worldToCanvasY = function(worldY)
	{
		var viewPortY = this.worldToViewPortY(worldY);
		canvasY = this.viewPortToCanvasY(viewPortY);
				
		return canvasY;
		
	}
    // World to canvas size -------------------------------------------------------------------
	
	this.worldToCanvasSizeP = function(fromPoint,toPoint)
	{
		var viewPortX = this.worldToViewPortSizeX(fromPoint.x);
		var viewPortY = this.worldToViewPortSizeY(fromPoint.y);

		toPoint.x = this.viewPortToCanvasSizeX(viewPortX);
		toPoint.y = this.viewPortToCanvasSizeY(viewPortY);
		
		return toPoint;
		
	}
	
	this.worldToCanvasSizeX = function(worldX)
	{
		var viewPortX = this.worldToViewPortSizeX(worldX);
		canvasX = this.viewPortToCanvasSizeY(viewPortX);
				
		return canvasX;
		
	}
	this.worldToCanvasSizeY = function(worldY)
	{
		var viewPortY = this.worldToViewPortSizeX(worldY);
		canvasY = this.viewPortToCanvasSizeY(viewPortY);
				
		return canvasY;
		
	}
	
	this.setViewPortBoundsByRatio = function(widthHeightRatio)
	{
		if(widthHeightRatio<1)
		{
			
			var width = 1;
			var height = widthHeightRatio;
			//this.viewPortBounds.set2(width,height);
			this.canvasViewPortMagnification = createPoint2d(width,height);
		}
		else
		{
			var width = 1;
			var height = widthHeightRatio;
			this.viewPortBounds.set2(width,height);			
		}
	}
	
	this.setViewPortCanvasRatios = function()
	{
		this.viewPortCanvasMagnification.x = this.canvasBounds.x / this.viewPortBounds.x  ;
		this.viewPortCanvasMagnification.y = this.canvasBounds.y / this.viewPortBounds.y  ;
	}
	
	this.canvasResize = function(canvasSizeX,canvasSizeY)
	{
		
	}

}