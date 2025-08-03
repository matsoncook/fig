function Loader()
{
	//Start of circular loading

	var prevTime = 0;
	var thisTime = 0;
	var rad = 0;
	var timeToTakeOneRevolution = 2000;
	var advanceAdj = 1;
	var advanceAcceleration = 1.05;
	var revolutionOn = true;
	var radRevolutionOff = 0;


	
	
	this.draw = function(canvas,context)
	{

		if(thisTime == 0)
		{
			thisTime = Date.now();
		}
		prevTime = thisTime;
		thisTime = Date.now();
		var diffTime = thisTime - prevTime;
		
		
		
		//advanceTimeAdj = (thisTime - prevTime) / 25;
		
		context.clearRect(0,0,canvas.width,canvas.height);
		
	    var centerX = canvas.width / 2;
	    var centerY = canvas.height / 2;
	    
	    var aspect  = canvas.width > canvas.height ? canvas.height : canvas.width;
	    
	    var radius = aspect/4;
	    
	    var lineWidth =  aspect/30;
	    
	    if(revolutionOn)
	    {
	    	
	         
	        
	    	context.save();
	    	
	    	 // translate context to center of canvas
	        context.translate(centerX, centerY);
	
	        // rotate 45 degrees clockwise
	        context.rotate(rad);
	    	
	        var grad= context.createLinearGradient(0, radius,0, -radius);
	        grad.addColorStop(0, "grey");
	        grad.addColorStop(1, "white");
	        
	        
	        context.beginPath();
	        context.arc(0, 0, radius, 0-Math.PI/2, Math.PI-Math.PI/2, false);
	
	        context.lineWidth = lineWidth;
	        //context.strokeStyle = '#003300';
	        context.strokeStyle = grad;
	        context.stroke();
	        
	        grad= context.createLinearGradient(0, radius,0, -radius);
	        grad.addColorStop(0, "grey");
	        grad.addColorStop(1, "black");
	        
	        context.beginPath();
	            
	        context.arc(0, 0, radius,  Math.PI-Math.PI/2, 2*Math.PI-Math.PI/2, false);
	
	        context.lineWidth = lineWidth;
	        //context.strokeStyle = '#003300';
	        context.strokeStyle = grad;
	        context.stroke();
	        
	        //context.translate(centerX, centerY);
	        
	        context.restore();
	    }
	    else
	    {
	    	context.beginPath();
	        
	        context.arc(centerX, centerY, radius,  0, 2*Math.PI, false);
	
	        context.lineWidth = lineWidth;
	        context.strokeStyle = '#003300';
	        //context.strokeStyle = grad;
	        context.stroke();
	    }
	
	    
	    //console.log(prevTime + " " + thisTime);
	    while(rad > 2*Math.PI)
	    {
	    	rad = rad - 2*Math.PI;
	    	radRevolutionOff = rad;
	    	revolutionOn = revolutionOn ? false : true;
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
	    
	    var indicatorRadius = lineWidth;
	    
	    
	    context.beginPath();
	    context.arc(centerX+x, centerY+y, indicatorRadius, 0, 2 * Math.PI, false);
	    context.lineWidth = lineWidth;
	    context.strokeStyle = '#003300';
	    context.stroke();
	    

	    
		
		
	}
}




