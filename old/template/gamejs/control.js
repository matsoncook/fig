function GameControl()
{
	
	this.gameRenderer = null;
	this.controlCanvas = null;
	var that = this;
	var mouseDetected = false;
	var touchDetected = false;
	this.onMouseDownEvent = function(event)
	{
		//mouseDetected = true;
		if(touchDetected)return;
	    var rect = that.gameRenderer.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

		var indexX = that.gameRenderer.canvasToGameX(x);
		var indexY = that.gameRenderer.canvasToGameY(y);
		that.doMouseDownEvent(indexX,indexY);
	}
	this.doMouseDownEvent = function(posX,posY)
	{
		that.doClickEvent(posX,posY);
	}
	this.onMouseMoveEvent = function(event)
	{
		//mouseDetected = true;
		if(touchDetected)return;
	    var rect = that.gameRenderer.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

		var indexX = that.gameRenderer.canvasToGameX(x);
		var indexY = that.gameRenderer.canvasToGameY(y);
		that.doMouseMoveEvent (indexX,indexY);
	}
	this.doMouseMoveEvent = function(posX,posY)
	{
		that.doClickEvent(posX,posY);
	}
	this.onMouseUpEvent = function(event)
	{
		//mouseDetected = true;
		if(touchDetected)return;
	    var rect = that.gameRenderer.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

		var indexX = that.gameRenderer.canvasToGameX(x);
		var indexY = that.gameRenderer.canvasToGameY(y);
		that.doMouseUpEvent(indexX,indexY);
	}
	this.doMouseUpEvent = function(posX,posY)
	{
		that.doClickEvent(posX,posY);
	}
	this.onTouchStartEvent = function(event)
	{

		//if(mouseDetected)return;		
		touchDetected = true;
        var touchobj = event.changedTouches[0]; // reference first touch point (ie: first finger)
        
	    var rect = that.gameRenderer.canvas.getBoundingClientRect();
        var x = parseInt(touchobj.clientX) - rect.left;
        var y = parseInt(touchobj.clientY) - rect.top;

		var indexX = that.gameRenderer.canvasToGameX(x);
		var indexY = that.gameRenderer.canvasToGameY(y);
		that.doTouchStartEvent(indexX,indexY);
		event.preventDefault();
	}
	this.doTouchStartEvent = function(posX,posY)
	{
		that.doClickEvent(posX,posY);
	}
	this.onTouchMoveEvent = function(event)
	{

		//if(mouseDetected)return;		
		touchDetected = true;
		
        var touchobj = event.changedTouches[0]; // reference first touch point (ie: first finger)
        
	    var rect = that.gameRenderer.canvas.getBoundingClientRect();
        var x = parseInt(touchobj.clientX) - rect.left;
        var y = parseInt(touchobj.clientY) - rect.top;

		var indexX = that.gameRenderer.canvasToGameX(x);
		var indexY = that.gameRenderer.canvasToGameY(y);
		that.doTouchMoveEvent(indexX,indexY);
		event.preventDefault();
	}
	this.doTouchMoveEvent = function(posX,posY)
	{
		that.doClickEvent(posX,posY);
	}
	this.onTouchEndEvent = function(event)
	{

		//if(mouseDetected)return;		
		touchDetected = true;
		
        var touchobj = event.changedTouches[0]; // reference first touch point (ie: first finger)
        
	    var rect = that.gameRenderer.canvas.getBoundingClientRect();
        var x = parseInt(touchobj.clientX) - rect.left;
        var y = parseInt(touchobj.clientY) - rect.top;

		var indexX = that.gameRenderer.canvasToGameX(x);
		var indexY = that.gameRenderer.canvasToGameY(y);
		that.doTouchEndEvent(indexX,indexY);
		event.preventDefault();
	}
	this.doTouchEndEvent = function(posX,posY)
	{
		that.doClickEvent(posX,posY);
	}
	
	this.doClickEvent = function(posX,posY)
	{
		
	}
	
	this.keyCodeEnum = {
	    BACKSPACE: 8,
	    COMMA: 188,
	    DELETE: 46,
	    DOWN: 40,
	    END: 35,
	    ENTER: 13,
	    ESCAPE: 27,
	    HOME: 36,
	    LEFT: 37,
	    NUMPAD_ADD: 107,
	    NUMPAD_DECIMAL: 110,
	    NUMPAD_DIVIDE: 111,
	    NUMPAD_ENTER: 108,
	    NUMPAD_MULTIPLY: 106,
	    NUMPAD_SUBTRACT: 109,
	    PAGE_DOWN: 34,
	    PAGE_UP: 33,
	    PERIOD: 190,
	    RIGHT: 39,
	    SPACE: 32,
	    TAB: 9,
	    UP: 38
	}
	
	this.keyEvents = [];
	
	
	this.addKeyEvent = function(keyCode,doFunction)
	{
		this.keyEvents.push({keyCode:keyCode,doFunction:doFunction});
	}
	this.onKeyDownEvent = function(e)
	{
		var keyCode = e.keyCode;
		console.log("keyCode " + keyCode)
		for(var i = 0; i < that.keyEvents.length; i++)
		{
			if(that.keyEvents[i].keyCode ==  keyCode)
			{
				that.keyEvents[i].doFunction();
			}
			
		}
	}
	
	this.onResize  = function(event)
	{
		//console.log("resize");
		
		that.doResize();
	}
	this.doResize  = function(sizeX,sizeY)
	{
		console.log("resize");
	}
	this.onOrientationChange  = function()
	{
		setTimeout(that.doOrientationChange, 500);
	}
	this.doOrientationChange  = function()
	{
		
	}
	this.setupControls = function()
	{
	    //https://stackoverflow.com/questions/18928116/javascript-keydown-event-listener-is-not-working?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
	    this.controlCanvas.setAttribute("tabindex", 0);
	
	
	    //this.controlCanvas.onkeypress = this.onKeyDownEvent;
	    //this.controlCanvas.addEventListener('keypress', this.onKeyDownEvent, false);
	    this.controlCanvas.addEventListener('keydown', this.onKeyDownEvent, false);
		this.controlCanvas.addEventListener('mousedown', this.onMouseDownEvent, false);
		this.controlCanvas.addEventListener('mousemove', this.onMouseMoveEvent, false);
		this.controlCanvas.addEventListener('mouseup', this.onMouseUpEvent, false);
		this.controlCanvas.addEventListener('touchstart', this.onTouchStartEvent, false);
		this.controlCanvas.addEventListener('touchmove', this.onTouchMoveEvent, false);
		this.controlCanvas.addEventListener('touchend', this.onTouchEndEvent, false);
		window.addEventListener('resize', this.onResize, false);
		window.addEventListener("orientationchange", this.onOrientationChange, false);
		
	}
	

	//this.canvas.addEventListener('click', this.onclickEvent, false);
	//this.canvas.addEventListener('mousemove', this.onclickEvent, false);
	//this.canvas.addEventListener('mousedown', this.onMouseDown, false);
	//this.canvas.addEventListener('mouseup', this.onMouseUp, false);
}