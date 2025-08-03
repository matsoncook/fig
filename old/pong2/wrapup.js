function createGameWrapUp()
{
	var gs = new GameState();
	gs.initialise = function()
	{
		var bg = createBackgroundImageObject("images/flowers/lawn.jpg");
		this.addGameObject(bg); 
		
		var to = createTextObject2d("Your score is");
		to.size.set2(0.1,0.15);
		this.addGameObject(to);
	}
		
	gs.initialise();
	return gs;
}