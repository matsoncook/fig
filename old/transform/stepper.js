function Stepper(from,to,step)
{
	this.from = from;
	this.to = to;
	this.step = step;
	this.current = from;
	this.multiplier = 1;
	this.next = function()
	{
		this.current += this.step * this.multiplier;
		if(this.current>this.to)
		{
			this.current = this.to;
			this.multiplier = -1;
		}
		if(this.current<this.from)
		{
			this.current = this.from;
			this.multiplier = 1;
		}
		return this.current; 
	}
}