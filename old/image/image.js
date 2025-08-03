function createMcImage(source,onLoadedFunction)
{
	var mcImage = new McImage(source);
	if(onLoadedFunction!=null)
	{
		mcImage.onLoadedFunction = onLoadedFunction;
		
	}
	
	mcImage.image.addEventListener('load', function()
			{
				this.mcImage.onLoadedFunction();
			});
	return mcImage.load();
}


function McImage(source)
{

	this.image = new Image();
	this.image.mcImage = this;
	this.source = source;

	this.load = function()
	{
		this.image.src = this.source;
		return this;
	};
	
	this.onLoadedFunction = function(){
		//this is mcImage
	};
	
	
    
	this.isComplete = function()
	{
		return this.image.complete;
	}
	
	return this;
}