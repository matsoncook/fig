


function createSurroundImage(surroundImage,gameImageDimensions,imagePixelDimensions)
{
	var gameObject = new GameObject(14,"");
	gameObject.surroundImage = surroundImage;
	
	//This is the game dimensions (usually porthole of 1,1), but this could be (6,1) for a pano
	gameObject.gameImageDimensions = gameImageDimensions;
	
	//This is the actual dimensions of the jpeg or png
	gameObject.imagePixelDimensions = imagePixelDimensions;
	
	//This is the shift from center in game dimensions  (usually porthole of 1,1)
	gameObject.gameImagePosition = createPoint2d(0,0);
	
	gameObject.gameToImagePositionX = function(gamePositionX)
	{
		
		gamePositionX = gamePositionX % this.gameImageDimensions.x;
		
		var h = this.gameImageDimensions.x/2.0;
		if(gamePositionX>h)
		{
			gamePositionX = -this.gameImageDimensions.x + gamePositionX;
		}else {
			if(gamePositionX < -h)
			{
				gamePositionX = this.gameImageDimensions.x + gamePositionX;
			}
		}
		/*if(gamePositionX<-h)
		{
			gamePositionX = h + gamePositionX;
		}*/
		
		var conversionRate = this.imagePixelDimensions.x / this.gameImageDimensions.x;
		
		var centeredX = gamePositionX * conversionRate + (this.imagePixelDimensions.x/2.0);
		
		return centeredX;
		
		
	}
	gameObject.gameToImagePositionY = function(gamePositionY)
	{
		gamePositionY = gamePositionY % this.gameImageDimensions.y;
		var conversionRate = this.imagePixelDimensions.y / this.gameImageDimensions.y;
		
		return gamePositionY * conversionRate + (this.imagePixelDimensions.y/2.0);
		
		
	}
	
	gameObject.gameToImageSizeX = function(gameSizeX)
	{
		var conversionRate = this.imagePixelDimensions.x / this.gameImageDimensions.x;
		
		return gameSizeX * conversionRate;
		
		
	}
	gameObject.gameToImageSizeY = function(gameSizeY)
	{
		var conversionRate = this.imagePixelDimensions.y / this.gameImageDimensions.y;
		
		return gameSizeY * conversionRate;
		
		
	}
	
	gameObject.beforeAdvance = function(time)
	{

		this.position.add(this.velocity);
		
	}
		
	gameObject.render = function(gameObject,gameRenderer)
	{
		//if(gameObject.cull)return;
		//var posX = gameRenderer.gameToCanvasX(gameObject.position.x);
		//var posY = gameRenderer.gameToCanvasY(gameObject.position.y);
		var sizeX = gameRenderer.gameToCanvasSizeX(gameObject.size.x);
		var sizeY = gameRenderer.gameToCanvasSizeY(gameObject.size.y);
		

		var pixelSizeX = gameObject.gameToImageSizeX(gameObject.size.x);
		var pixelSizeY = gameObject.gameToImageSizeY(gameObject.size.y);
		var imageShiftX = gameObject.gameToImagePositionX(gameObject.position.x) - pixelSizeX/2.0 ;
		var imageShiftY = gameObject.gameToImagePositionY(gameObject.position.y) - pixelSizeY/2.0 ;
		
		
		
		
		var context = gameRenderer.context;
		context.drawImage(gameObject.surroundImage.image,imageShiftX,imageShiftY,pixelSizeX,pixelSizeY,0,0,sizeX,sizeY);
		
		var overRunX = imageShiftX+pixelSizeX - gameObject.imagePixelDimensions.x;
		if(overRunX > 0)
		{
			
			overRunSizeX = overRunX * (sizeX / pixelSizeX);
			context.drawImage(gameObject.surroundImage.image,0,imageShiftY,overRunX,pixelSizeY,sizeX-overRunSizeX,0,overRunSizeX,sizeY);
		}
		
		var underRunX = imageShiftX;
		if(underRunX<0)
		{
			
			underRunSizeX = underRunX * (sizeX / pixelSizeX);
			
			var imageFromX = gameObject.imagePixelDimensions.x + underRunX;
			context.drawImage(gameObject.surroundImage.image,imageFromX,imageShiftY,-underRunX,pixelSizeY,0,0,-underRunSizeX,sizeY);
		}

	}
	
	return gameObject;
}