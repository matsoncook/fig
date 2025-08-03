function createMapOverlay(renderList,viewPort)
{
	var mapOverlay = new GameObject(1,"mapOverlay");
	mapOverlay.constructIt = function()
	{
		this.renderList = renderList;
		this.viewPort = viewPort;
		
		var worldSize = new Point2d();
		var worldPosition = new Point2d();
		var canvasSize = new Point2d();
		var canvasPosition = new Point2d();

		this.render =  function(gameObject,gameRenderer)
		{
			
			canvasBounds = gameObject.viewPort.canvasBounds;
			context.save();
			
			worldSize.set2(gameObject.viewPort.worldBounds.sizeX,gameObject.viewPort.worldBounds.sizeY);		
			gameObject.viewPort.worldToCanvasSizeP(worldSize,canvasSize);
			
			drawWorldBorder(gameObject,gameRenderer);
			drawBackground(gameObject,gameRenderer);
			
			context = gameRenderer.context;
			
			context.globalAlpha = 1.0;
			
			
			context.fillStyle = "#ff0000";
			
			var t = new Point2d();
			for(var i = 0; i < this.renderList.length; i++)
			{
				var go =  this.renderList[i];
				
				context.fillStyle = "#0000ff";
				if(go.name == game.player.name)
				{
					context.fillStyle = "#ff0000";
				}
				
				gameObject.viewPort.worldToCanvasP(go.position,canvasPosition);
				
				fillRectCentered(context, canvasPosition.x ,canvasPosition.y , 10,10);
				//context.fillRect(canvasPosition.x,canvasPosition.y,canvasSize.x,canvasSize.y);
				
				
			}
			context.restore();
			
		}
		function drawWorldBorder(gameObject,gameRenderer)
	    {
			context = gameRenderer.context;
		
			
			//It would be nicer if this didnt have to be done
			worldPosition.set2(-gameObject.viewPort.worldBounds.halfSizeX,gameObject.viewPort.worldBounds.halfSizeY);	
			
			gameObject.viewPort.worldToCanvasP(worldPosition,canvasPosition);
			
			gameObject.viewPort.worldToCanvasSizeP(worldSize,canvasSize);
			
			context.globalAlpha = 1;
			context.strokeStyle = "#ffffff";
			context.lineWidth =1;
			/*context.beginPath();
			context.closePath();
			context.stroke();*/
			context.strokeRect(canvasPosition.x,canvasPosition.y,canvasSize.x,canvasSize.y);
			
			
	    }
		function drawBackground(gameObject,gameRenderer)
	    {
			context = gameRenderer.context;
			
			
			//It would be nicer if this didnt have to be done
			worldPosition.set2(-gameObject.viewPort.worldBounds.halfSizeX,gameObject.viewPort.worldBounds.halfSizeY);	
			
			gameObject.viewPort.worldToCanvasP(worldPosition,canvasPosition);
			
			gameObject.viewPort.worldToCanvasSizeP(worldSize,canvasSize);
			
			context.globalAlpha = 0.2;

			context.fillStyle = "#00000";
			context.fillRect(canvasPosition.x,canvasPosition.y,canvasSize.x,canvasSize.y);
			//fillRectCentered(context, canvasPosition.x ,canvasPosition.y , canvasSize.x,canvasSize.y);
			//context.fillRect(canvasPosition.x,canvasPosition.y,canvasSize.x,canvasSize.y);
			
			
	    }
	}
	
   
	
    mapOverlay.constructIt();
	
	return mapOverlay;
	
}