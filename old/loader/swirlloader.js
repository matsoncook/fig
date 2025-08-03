function Loader()
{


	var prevTime = 0;
	var thisTime = 0;
	var rad = 0;
	var timeToTakeOneRevolution = 4000;
	var advanceAdj = 1;
	var advanceAcceleration = 1.05;
	var revolutionOn = true;
	var radRevolutionOff = 0;
	this.radius = 0;
	this.lineWidth = 0;
	
	this.centerX = 0;
	this.centerY = 0;
	this.color = "200,200,200";
	this.strokeStyle = "#ffffff";
	
	this.drawSwirl = function(canvas,context,angleRad,transparency)
	{
		context.save();
	    // translate context to center of canvas
		context.translate(this.centerX, this.centerY);
		
		// rotate 45 degrees clockwise
		context.rotate(angleRad);
		
    	context.fillStyle = "rgba("+this.color+","+transparency+")";
    	context.strokeStyle = this.strokeStyle;
        context.beginPath();
 
        // var inner = canvas.width/4;
        //var outer = canvas.width/2;
        var inner = canvas.width/2;
        var outer = canvas.width*2;
        
        context.moveTo(0,-outer);

        context.bezierCurveTo(outer,0,0,inner,0,0);
        

        context.bezierCurveTo(inner,0,0,-outer,-outer,0);

       
        context.stroke();
        context.fill(); 
        
        
        context.restore();
        
        
	}
	
	
	this.draw = function(canvas,context)
	{
	    if(thisTime == 0)
	    {
	        thisTime = Date.now();
	    }
	    prevTime = thisTime;
	    thisTime = Date.now();
	    var diffTime = thisTime - prevTime;
	    
	    context.clearRect(0,0,canvas.width,canvas.height);
	    
	    this.centerX = canvas.width / 2;
	    this.centerY = canvas.height / 2;
	    
	    var aspect  = canvas.width > canvas.height ? canvas.height : canvas.width;
	    
	    var radius = aspect/4;
	    this.radius = radius;
	    
	    this.lineWidth =  aspect/40;
	    
	    
	    while(rad > 2*Math.PI)
	    {
	        rad = rad - 2*Math.PI;
	        radRevolutionOff = rad;
	        revolutionOn = !revolutionOn;
	        if(revolutionOn == false)
	        {
	            advanceAdj = 1;
	        }
	    }
	    
	    var advanceRad = (2 * Math.PI) * diffTime/timeToTakeOneRevolution;
	    
	    advanceAdj = rad < Math.PI ? advanceAdj * advanceAcceleration : advanceAdj / advanceAcceleration;
	    
	    advanceAdj = advanceAdj < 1 ?  1 : advanceAdj;
	    
	    //advanceAdj = 1;
	    rad = rad + (advanceRad * advanceAdj);//0.01 * advanceTimeAdj;
	    
	    var finalRad = revolutionOn ? rad : radRevolutionOff;
	    finalRad -= Math.PI/2;
	    var x = Math.cos(finalRad) * radius;
	    var y = Math.sin(finalRad) * radius;
	    
	    var tranparency = revolutionOn ? 1 : (Math.sin(rad+(2*Math.PI))+1)/2;
	    	    
		this.drawSwirl(canvas,context,finalRad,tranparency);
		this.drawSwirl(canvas,context,finalRad+Math.PI,tranparency);
	        	    
	}
}
//End of swirly loading

