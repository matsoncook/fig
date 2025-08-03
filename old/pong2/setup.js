function setupGame(canvas,controlCanvas,audio)
{
	//testLineSegmentIntersecter();
	game = new Game();
	
	game.gameRenderer.canvas = canvas;
	game.gameControl.controlCanvas = controlCanvas;	
	game.gameRenderer.setSize(window.innerWidth,window.innerHeight);

	game.gameRenderer.context = canvas.getContext('2d');
	game.gameRenderer.staticImageCount = 8;
	game.gameRenderer.staticImages = [];
	for(var i = 0;i<game.gameRenderer.staticImageCount;i++)
	{
		game.gameRenderer.staticImages[i] = new Image();
	}
	for(var i = 0;i<game.gameRenderer.staticImageCount;i++)
	{
		game.gameRenderer.staticImages[i].src="images/pumkin/download0"+i+".png";
	}
	

	
	
	
	
	
	
	game.gameRenderer.ballImage1 = new Image();
	game.gameRenderer.ballImage1.src = "images/pong2/rocket1.png";
	game.gameRenderer.ballImage2 = new Image();
	game.gameRenderer.ballImage2.src = "images/pong2/rocket2.png";
	game.gameRenderer.ballImage3 = new Image();
	game.gameRenderer.ballImage3.src = "images/pong2/rocket3.png";
	
	game.gameRenderer.staticImage = new Image();
	game.gameRenderer.staticImage.src = "images/ww3/kim.png";
	
	

	/*if(audio)
	{
		game.gameRenderer.launch = new McAudio("/audio/Laser Blasts-SoundBible.com-108608437.mp3");
		
	}
	else
	{
		game.gameRenderer.launch = null;
	}*/
	
	
	game.gameRenderer.staticImage.src = "images/ww3/kim.png";
	
	game.gameRenderer.boomRed = new Image();
	game.gameRenderer.boomRed.src = "images/boomRed.png";
	
	
	game.gameControl.setupControls();
	
	var toSend = {"sessionString":"{game: pumpkin,width:"+canvas.width+",height:"+canvas.height+"}","gameName":"pong2"};
	var xHttp = new XhttpClient("/model/GameSession/add");
	xHttp.post("data="+JSON.stringify(toSend));
	//game.gameState.fire(0,-0.25);
	//game.gameState.fire(0.0964912280701754,-0.2929824561403509);
	//game.gameState.fire(-0.011498688069146445,-0.30567988887173947);
	//game.gameState.fire(0.17174515235457066,-0.2721606648199446);
	//game.start();
	

	
	if(audio)
	{
		setupIntro();
		setupMainGame();
		setupWrapUp();
		game.switchGameState(game.gameIntro);
		game.extendedState = true;
		/*game.intro = new Intro();
		game.intro.maxAudioCount = 8;
		var maxAudioCount = game.intro.maxAudioCount;
		for(var i = 0; i < maxAudioCount; i++)
		{
			var audio = new McAudio("/audio/sa/cut"+(i+2)+".mp3");
			game.intro.audio.push(audio);
		}
		for(var i = 0; i < maxAudioCount-1; i++)
		{
			var audio = game.intro.audio[i];
			audio.setNext(game.intro.audio[i+1]);
			
		}
		game.intro.audio[maxAudioCount-1].setNext(game.intro.audio[0]);
		game.intro.images = game.gameRenderer.staticImages;
		game.intro.play();*/
	}
	else
	{
		setupMainGame();
		game.switchGameState(game.gameMain);
		game.start();
	}
	
	


}

function setupIntro()
{
	game.gameIntro = createGameIntro();
	
	
 
	game.gameIntro.bindControls = function(gameControl)
	{
		gameControl.doClickEvent = function(){
			game.switchGameState(game.gameMain);
			
		};
		gameControl.doMouseDownEvent = function(){};
		gameControl.doTouchStartEvent = function(){};
		gameControl.doMouseMoveEvent = function(){};
		gameControl.doTouchMoveEvent = function(){};
		gameControl.doMouseUpEvent = game.gameControl.doClickEvent;
		gameControl.doTouchEndEvent = game.gameControl.doClickEvent;
	}
}

function setupMainGame()
{
	
	game.gameMain = createPong2GameState();
	game.gameMain.setup();
	
	game.gameMain.bindControls = function(gameControl)
	{
		gameControl.doClickEvent = function(){};
		gameControl.doMouseDownEvent = game.gameMain.startAim;
		gameControl.doTouchStartEvent = game.gameMain.startAim;
		gameControl.doMouseMoveEvent = game.gameMain.aim;
		gameControl.doTouchMoveEvent = game.gameMain.aim;
		gameControl.doMouseUpEvent = game.gameMain.fire;
		gameControl.doTouchEndEvent = game.gameMain.fire;
	}	
	
}

function setupWrapUp()
{
	game.gameWrapUp = createGameWrapUp();
	
	
 
	game.gameWrapUp.bindControls = function(gameControl)
	{
		gameControl.doClickEvent = function(){
			game.switchGameState(game.gameMain);
			
		};
		gameControl.doMouseDownEvent = function(){};
		gameControl.doTouchStartEvent = function(){};
		gameControl.doMouseMoveEvent = function(){};
		gameControl.doTouchMoveEvent = function(){};
		gameControl.doMouseUpEvent = game.gameControl.doClickEvent;
		gameControl.doTouchEndEvent = game.gameControl.doClickEvent;
	}
}