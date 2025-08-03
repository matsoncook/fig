function createBackgroundGrid(gameState)
{
	var bgg = new GameObject(0,"BackgroundGrid");
	
	
	
	bgg.render = function (gameObject,gameRenderer)
	{
		
		context.fillStyle="#006600";
		context.fillRect(0, 0, gameRenderer.width, gameRenderer.height);
	}

	gameState.addGameObject(bgg);
	for(var x = -4.5; x <= 4.5; x++)
	{
		for(var y = -4.5; y <= 4.5; y++)
		{
	/*for(var x = -0.5; x <= 0.4; x++)
	{
		for(var y = -0.5; y <= 0.4; y++)
		{*/
			var bg = createBackgroundImageObject("/images/flowers/lawn.jpg");
			bg.render = bg.render2;
			//gameState.backgroundObject = bg;
			bgg.addChildObject(bg);
			bg.position.x = x;
			bg.position.y = y;
			bg.size.set2(1,1);

		}		
	}
	
}
function createBackgroundGrid1(backgroundGameObjectGroup,bounds)
{
  
	
	
	
	backgroundGameObjectGroup.render = function (gameObject,gameRenderer)
	{		
		//context.fillStyle="#006600";
		context.fillStyle="#444400";
		context.fillRect(0, 0, gameRenderer.width, gameRenderer.height);
	}


	for(var x = -bounds.x/2; x <= bounds.x/2; x++)
	{
		for(var y = -bounds.y/2; y <= bounds.y/2; y++)
		{
	
			var bg = createBackgroundImageObject1();

			backgroundGameObjectGroup.addChildObject(bg);
			bg.position.set2(x,y);

			

		}		
	}
	
}

function createBackgroundImageObject(source)
{
	var atan45 = Math.atan(Math.pi / 4);
	var bg = new GameObject(3,"Background");
	
	bg.initialise = function(source)
	{
		
		this.mcImage = null;
		this.source = source;
		this.load = function()
		{
			this.mcImage = createMcImage(source,this.onLoadedFunction);
			this.mcImage.gameObject = this
			return this;
		}
		
		this.notifyLoaded =  function()
		{
			
		}
		this.onLoadedFunction =  function()
		{
			//this is mcImage
			this.gameObject.loaded = true;
			this.gameObject.notifyLoaded();
		}
		this.loaded = false;
		
		this.render =  function(gameObject,gameRenderer)
		{
			if(gameObject.loaded)
			{
				gameRenderer.context.drawImage(gameObject.mcImage.image,0, 0, gameRenderer.width, gameRenderer.height);
			}
			else
			{
				gameRenderer.context.clearRect(0, 0, gameRenderer.width, gameRenderer.height);
			}
			
		}
		
		this.screenPosition = new Point2d();
		this.screenSize = new Point2d();
		
		this.render1  =  function(gameObject,gameRenderer)
		{
			if(gameObject.loaded)
			{
				
				gameRenderer.viewPort.worldToCanvasP(gameObject.position,gameObject.screenPosition);
				gameRenderer.viewPort.worldToCanvasSizeP(gameObject.size,gameObject.screenSize);
				
				drawImageCentered(context,gameObject.mcImage.image,this.screenPosition.x,this.screenPosition.y,this.screenSize.x*2,this.screenSize.y*2);
				

				//gameRenderer.context.drawImage(gameObject.mcImage.image,x-sx, y-sy, sx, sy);
			}
			else
			{
				gameRenderer.context.clearRect(0, 0, gameRenderer.width, gameRenderer.height);
			}
		}
		this.render2   =  function(gameObject,gameRenderer)
		{
			gameRenderer.viewPort.worldToCanvasP(gameObject.position,gameObject.screenPosition);
			gameRenderer.viewPort.worldToCanvasSizeP(gameObject.size,gameObject.screenSize);
			
			var spx = gameObject.screenPosition.x;
			var spy = gameObject.screenPosition.y;
			var ssx = gameObject.screenSize.x;
			var ssy = gameObject.screenSize.y;
			var hssx = gameObject.screenSize.x/2;
			var hssy = gameObject.screenSize.y/2;
			
			
			
			var context = gameRenderer.context;
			
			context.fillStyle = "#444400";
			context.fillRect(spx-hssx,spy-hssy,ssx,ssy);
			
			context.fill();
			context.strokeStyle = "#777700";
			context.lineWidth = Math.floor(ssx/5);
			/*context.beginPath();
			//context.shadowBlur=20;
			
			context.rect(spx-hssx,spy-hssy,ssx,ssy);
			//context.stroke();
			context.stroke();
			context.closePath();*/
			
			
			context.beginPath();
			context.arc(spx,spy,ssx/2,0,2*Math.PI);
			context.stroke();
			context.closePath();
			
			
			//context.stroke();
			//context.closePath();
			//context.fillStyle = "#004400";
			//context.moveTo(1, 0);
		    //context.lineTo(atan45, atan45);
		    //context.stroke();
		    var atan45sx = atan45 * this.screenSize.x;
		    var atan45sy = atan45 * this.screenSize.y;
		    var x = this.screenSize.x;
		    var y = this.screenSize.y;
		    
		  //context.moveTo(1, 0);
		    //context.lineTo(atan45, atan45);
			
		      /*context.rect(188, 50, 200, 100);
		      context.fillStyle = 'yellow';
		      context.fill();
		      context.lineWidth = 7;
		      context.strokeStyle = 'black';
		      context.stroke();*/
		      
	

			
			
			
		}
		
		
	}
	bg.initialise(source);
	bg.load();
	return bg;
}
function createBackgroundImageObject1()
{
	var atan45 = Math.atan(Math.pi / 4);
	var bg = new GameObject(3,"Background");
	
	bg.initialise = function()
	{
	    bg.size.set2(0.75,0.75);
		this.screenPosition = new Point2d();
		this.screenSize = new Point2d();
		
		
		this.render =  function(gameObject,gameRenderer)
		{
			

			gameRenderer.viewPort.worldToCanvasP(gameObject.position,gameObject.screenPosition);
			gameRenderer.viewPort.worldToCanvasSizeP(gameObject.size,gameObject.screenSize);
			
			var spx = gameObject.screenPosition.x;
			var spy = gameObject.screenPosition.y;
			var ssx = gameObject.screenSize.x;
			var ssy = gameObject.screenSize.y;
			var hssx = gameObject.screenSize.x/2;
			var hssy = gameObject.screenSize.y/2;
			
			
			
			var context = gameRenderer.context;
			context.save();
			
			//context.fillStyle = "#444400";
			//context.fillRect(spx-hssx,spy-hssy,ssx,ssy);
			
			//context.fill();
			
			context.strokeStyle = "#777700";
			context.lineWidth = Math.floor(ssx/5);
			
			
			
			context.beginPath();
			context.arc(spx,spy,ssx/2,0,2*Math.PI);
			context.stroke();
			context.closePath();
			
			
			
		      
		    context.restore();

			
			
			
		}
		
		
	}
	bg.initialise();

	return bg;
}