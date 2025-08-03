function Point2dStepper(from,to,stepCount)
{
	this.from = from;
	this.to = to;
	this.stepCount = stepCount;
	
	this.current = clonePoint2d(from);
	
	this.step = this.createStep();
	
	this.reversable = false;
	
	this.direction = 1;
	this.directionStepCount = 0;
	
	this.directionalStep = clonePoint2d(this.step);
	
	
	
}

Point2dStepper.prototype = {
		

		createStep : function()
		{
			var step = createPoint2d();
			step.x = (this.to.x - this.from.x) / this.stepCount;
			step.y = (this.to.y - this.from.y) / this.stepCount;
			return step;
			
		},
		next : function()
		{
			if(this.reversable)
			{
				
				this.doReverseIf();
				this.current.add(this.directionalStep);
			}
			else
			{
				this.current.add(this.step);
			}
			
		},
		doReverseIf : function()
		{
			this.directionStepCount++;
			if(this.directionStepCount > this.stepCount)
			{
				this.directionStepCount = 0;
				this.direction *= -1;
				this.directionalStep.set1(this.step);
				this.directionalStep.scale(this.direction);
				
			}
		},
		set3 : function(from,to,stepCount)
		{
			this.from = from;
			this.to = to;
			this.stepCount = stepCount;
			this.current.set1(this.from);
			this.step = this.createStep();
		}
}