function GameAnimation()
{
	this.animationOn = false;
	this.animationId = null;
	this.gameState = null;
	this.gameRenderer = null;
	this.timeIntervalMilli = 50;
	this.timeAdvanceMultiple = 0.05;
	this.animationFrame = null;
	this.canvas = null;

	
	//mc Hammer
	this.mc = null;
	
	this.startAnimation = function ()
	{
		 this.animationOn = true;
		 moveOneTick();
		 //this.animationId = window.requestAnimationFrame(moveOneTick);
	}
	this.stopAnimation = function ()
	{
		window.cancelAnimationFrame(this.animationFrame);
	}
	
	this.collectStats = function()
	{
		
	}
	
	
	
	
}

window.requestAnimFrame = (function() {
	  return window.requestAnimationFrame ||
	         window.webkitRequestAnimationFrame ||
	         window.mozRequestAnimationFrame ||
	         window.oRequestAnimationFrame ||
	         window.msRequestAnimationFrame ||
	         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
	           window.setTimeout(callback, 1000/60);
	         };
	})();


function moveOneTick()
{
	
	
	var gol = game.gameState.gameObjectList;
	var gr = game.gameRenderer;
	var gs = game.gameState;
	var animation = game.gameAnimation;
	
	var now = Date.now();
	gs.advance(now);		
	gr.render(now,game.gameRenderer.context,gol);
	
	animation.animationFrame = window.requestAnimFrame(moveOneTick);
    
}


