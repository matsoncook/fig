function Game()
{
	//@Deprecated
	this.extendedState = false;
	
	this.soundEnabled = false;
	
	
	this.gameRenderer = new GameRenderer();
	this.gameState = new GameState();
	this.gameControl = new GameControl();
	this.gameAnimation = new GameAnimation();
	//this.gameIntro = new GameIntro();
	this.gameIntro = {
		gameObjectList :  [],
		
		isNowPlaying : function()
		{
			return false;
		}
	};
	this.gameAnimation.state = this.gameState;
	this.gameAnimation.renderer = this.gameRenderer;
	this.gameControl.gameRenderer = this.gameRenderer;
	
	
	this.addGameObject = function(gameObject)
	{
		this.gameState.gameObjectList.push(gameObject)
	}
	
	this.start = function()
	{
		this.gameAnimation.startAnimation();		
	}
	this.start1 = function()
	{
		loading = false;
		game.gameAnimation.startAnimation();		
	}
	
	this.stop = function()
	{
		this.gameAnimation.stopAnimation();		
	}
	
	this.lastTimeChecked = 0;
	this.firstTimeChecked = 0;
	this.maxCheckMediaTime = 1000;
	this.mediaList = [];
	this.checkAllLoaded = function(theTime)
	{
		if(this.firstTimeChecked!=0)
		{
			if(theTime-this.firstTimeChecked > this.maxCheckMediaTime)
			{
				return true;
			}
		}
		else
		{
			this.firstTimeChecked = theTime;
		}		
	}
	
	this.switchGameState = function(gameState)
	{
		this.gameState.switchGameStateOut();
		this.gameState = gameState;
		
		this.gameState.bindControls(this.gameControl);
		this.gameState.switchGameStateIn();
		
	}
	
	this.restart = function()
	{
		
	}
	
}