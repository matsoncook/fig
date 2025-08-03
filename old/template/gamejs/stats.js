var statsCollecter = {statsList : []};

function addStatsCollector(name)
{
	var statsItem = new StatsItem(name);
	statsCollector.statsList.push(statsItem);
	return statsItem;
}

function StatsItem(name)
{
	
	this.addTime = function()
	{
		
	};
}

function FpsCalculator()
{
	this.receivePreviousTime = 0;
	this.receiveFps = 0;
	this.receiveFpsCount = 0;
	this.currentFps = 0;

	this.collect = function()
	{
		if(this.receivePreviousTime==0)
		{
			this.receivePreviousTime = Date.now();
		}
		this.receiveFpsCount++;
		var now = Date.now();
		if(now > this.receivePreviousTime + 1000)
		{
			var deltaTime = (now - this.receivePreviousTime);
			var fps = (this.receiveFpsCount/deltaTime)*1000;
			this.currentFps = Math.floor(fps);
			this.notify(this.currentFps);
			this.receivePreviousTime = now;
			this.receiveFpsCount = 0;
			
		}
	}
	this.notify = function()
	{
		
	}
}