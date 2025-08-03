function McAudio(audioFile)
{
	this.source = audioFile;
	this.audio = new Audio(audioFile);
	this.audio.mcAudio = this;
	this.playNext = false;
	this.nextAudio = null;
	this.loop = false;
	
	this.play = function()
	{
		this.audio.loop = this.loop;
		this.audio.play();
	}
	this.playClone = function()
	{
		this.audio.cloneNode().play();
		
	}
	this.stop = function()
	{
		this.audio.pause();
		this.audio.currentTime = 0;
	}
	this.setNext = function(nextMcAudio)
	{
		this.playNext = true;
		this.nextAudio = nextMcAudio;
		this.audio.onended = function() {
			var mcAudio = this.mcAudio;
			if(mcAudio.playNext)
			{
				mcAudio.nextAudio.play();
			}
		   
		};
	}
	
	this.isComplete = function()
	{
		return this.audio.readyState == 4;
	}
	
	

}

