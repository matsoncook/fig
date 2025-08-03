function createAudioObject(source)
{
	var ao = new GameObject();
	
	ao.initialise = function(source)
	{
		this.source = source;
		this.mcAudio = new McAudio(source);
		this.loop = false;
		this.startPlay = false;
		this.play = function()
		{
			this.startPlay = true;
			
		}
		this.stop = function()
		{
			this.mcAudio.stop();
			
		}
		this.loop = function(loopStatus)
		{
			this.mcAudio.loop = loopStatus;
			
		}
		
		this.render =  function(gameObject,gameRenderer)
		{
			//console.log(this.source);
			if(game.soundEnabled && this.startPlay)
			{
				this.startPlay = false;
				this.mcAudio.play();
			}
		
		}
		
	}
	ao.initialise(source);
	return ao;
}