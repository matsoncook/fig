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
	this.refreshIntervalId = 0;

	
	//mc Hammer
	this.mc = null;
	
	this.startAnimation = function ()
	{
		 this.animationOn = true;
		 animateOneTick();
		 this.refreshIntervalId = window.setInterval(advanceOneTick, 20);
		 //this.animationId = window.requestAnimationFrame(moveOneTick);
	}
	this.stopAnimation = function ()
	{
		window.cancelAnimationFrame(this.animationFrame);
		clearInterval(this.refreshIntervalId);
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


function animateOneTick()
{
	
	
	var gol = game.gameState.gameObjectList;
	var gr = game.gameRenderer;
	var gs = game.gameState;
	var animation = game.gameAnimation;
	
	var now = Date.now();
		
	gr.render(now,game.gameRenderer.context,gol);
	
	animation.animationFrame = window.requestAnimFrame(animateOneTick);
    
}
function advanceOneTick()
{

	var gs = game.gameState;
	var animation = game.gameAnimation;
	
	gs.advance(Date.now());	
	
	animation.collectStats();
    
}


