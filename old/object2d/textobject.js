var HorizontalJustification = {Center:0,Left:1,Right:2};
var VerticalJustification = {Center:1,Top:0,Bottom:2};

function createTextObject2(name,text)
{
	var to = createTextObject2d(text);
	to.name=name;
	return to;
}
function createTextObject2d(text)
{
	
	
	var go = new GameObject();
	
	
	go.text = text;
	
	go.doFill = true;
	go.fillStyle = "red";
	
	go.doStroke = false;
	go.strokeStyle = "none";
	
	go.lineWidth = 3;
	
	go.font = "Arial";
	go.bold = "";
	go.italic = "";
	
	go.size.set2(0.1,0.1);
	go.scaleWidth = false;
	
	go.screenPosition = new Point2d();
	go.screenSize = new Point2d();
	
	go.textAlign = "center";
	go.horizontalJustification = HorizontalJustification.Center;
	go.verticalJustification = VerticalJustification.Center;


	go.setHorizontalJustification = function(horiz)
	{
		this.horizontalJustification = horiz;
		if(this.horizontalJustification == HorizontalJustification.Center)
		{
			this.textAlign = "center";
		}
		else if(this.horizontalJustification == HorizontalJustification.Left)
		{
			this.textAlign = "left";
		}
		else if(this.horizontalJustification == HorizontalJustification.Right)
		{
			this.textAlign = "right";
		}
		return this;
	}
	go.setVerticalJustification = function(vert)
	{
		this.verticalJustification = vert;
		/*if(this.verticalJustification == VerticalJustification.Center)
		{
			this.textAlign = "center";
		}
		else if(this.verticalJustification == VerticalJustification.Top)
		{
			this.textAlign = "left";
		}
		else if(this.verticalJustification == VerticalJustification.Bottom)
		{
			this.textAlign = "right";
		}*/
		return this;
	}
	
	go.setStrokeStyle = function(strokeStyle)
	{
		this.strokeStyle = strokeStyle;
		this.doStroke = (this.strokeStyle !="none");
		return this;
		
	}
	go.setFillStyle = function(fillStyle)
	{
		this.fillStyle = fillStyle;
		this.doFill = (this.fillStyle !="none");
		return this;
		
	}
	go.setLineWidth = function(lineWidth)
	{
		this.lineWidth = lineWidth;
		
		return this;
		
	}
	
	go.render =  function(gameObject,gameRenderer)
	{
		var posX = 0;
		var posY = 0;
		var sizeX = 0;
		var sizeY = 0;
		if(gameObject.usingViewPort ) //gameObject
		{
			var viewPort = gameObject.viewPort;
			viewPort.viewPortToCanvasP(gameObject.position,gameObject.screenPosition);
			viewPort.viewPortToCanvasSizeP(gameObject.size,gameObject.screenSize);
			posX = gameObject.screenPosition.x;
			posY = gameObject.screenPosition.y;
			sizeX = gameObject.screenSize.x;
			sizeY = gameObject.screenSize.y;
		}
		else if(gameRenderer.usingViewPort )//gameRenderer
		{
			var viewPort = gameRenderer.viewPort;
			viewPort.viewPortToCanvasP(gameObject.position,gameObject.screenPosition);
			viewPort.viewPortToCanvasSizeP(gameObject.size,gameObject.screenSize);
			posX = gameObject.screenPosition.x;
			posY = gameObject.screenPosition.y;
			sizeX = gameObject.screenSize.x;
			sizeY = gameObject.screenSize.y;
		}
		else
		{
			posX = gameRenderer.gameToCanvasX(gameObject.position.x);
			posY = gameRenderer.gameToCanvasY(gameObject.position.y);
			sizeX = gameRenderer.gameToCanvasSizeX(gameObject.size.x);
			sizeY = gameRenderer.gameToCanvasSizeY(gameObject.size.y);
		}
		
		
		var font = this.italic + this.bold + "" + sizeY + "px " + this.font;
		var context = gameRenderer.context;
		context.font = font;
		
		var vertPos = posY+((sizeY/2) * this.verticalJustification) ;
		
		if(gameObject.scaleWidth)
		{
			context.save();
			var metrics = context.measureText(go.text);
			var scaleX = sizeX/metrics.width;
			context.translate(posX,vertPos);
			context.scale(scaleX, 1);

			
			context.fillStyle = this.fillStyle;
			context.textAlign = this.textAlign;
			
			context.strokeText(this.text,0,0);
			context.fillText(this.text,0,0);
			
			context.restore();
		}
		else
		{
			
			
			context.textAlign = this.textAlign;
			if(this.doStroke)
			{
				context.lineWidth = this.lineWidth;
				context.strokeStyle = this.strokeStyle;
				context.strokeText(this.text,posX,vertPos);
			}
			if(this.doFill)
			{
			    context.fillStyle = this.fillStyle;
			    context.fillText(this.text,posX,vertPos);
			    //console.log(this.name + " " + this.text);
			}
			
			
		}
	
	}
	
	go.setBold = function(isBold)
	{
		if(isBold)
		{
			this.bold = "bold ";
			
		}
		else
		{
			this.bold = "";
		}
		
	}
	go.setItalic = function(isItalic)
	{
		if(isItalic)
		{
			this.italic = "italic ";
			
		}
		else
		{
			this.italic = "";
		}
		
	}
	go.setFontArial = function()
	{
		this.font = "Arial";
	}
	go.setFontComicSansMS = function()
	{
		this.font = "Comic Sans MS";
	}
	
	
	return go;
}

