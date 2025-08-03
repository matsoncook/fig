//End of circular loading
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
myLoader = new Loader();
myLoader.context = context;
myLoader.canvas = canvas;
myLoader.animationFrame = null;
myLoader.exitLoadingAnimation = false;
myLoader.widthHeightRatio = 1;

myLoader.setSize = function(windowInnerWidth,windowInnerHeight)
{
    var width = windowInnerWidth;
    var height = windowInnerHeight;
    
     
    
    if(width*this.widthHeightRatio>height)
    {
        width = Math.floor(height/this.widthHeightRatio);
    }
    else
    {
        height = width*this.widthHeightRatio;
    }
    width = width - width*this.borderRatio;
    height = height - height*this.borderRatio;

    
    this.width = width;
    this.height = height;
    this.canvas.width  = width;
    this.canvas.height = height;
}

myLoader.setSize(window.innerWidth,window.innerHeight);
myLoader.stop = function()
{
	myLoader.exitLoadingAnimation = true;
}

var drawLoadingProgress = function()
{
	myLoader.draw(canvas,context);
	
    if(myLoader.exitLoadingAnimation)
    {
    	myLoader.exitLoadingAnimation = false;
    	window.cancelAnimationFrame(myLoader.animationFrame);
    }
    else
    {
    	animationFrame = window.requestAnimFrame(drawLoadingProgress);	
    }
}

myLoader.animationFrame = window.requestAnimFrame(drawLoadingProgress);
