

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
		game.gameRenderer.staticImages[i].src="images/flowers/download0"+i+".png";
	}
	
	
	setupMainGame();
	
	

	
	game.gameRenderer.ballImage1 = new Image();
	game.gameRenderer.ballImage1.src = "images/flowers/drop01.png";
	game.gameRenderer.ballImage2 = new Image();
	game.gameRenderer.ballImage2.src = "images/flowers/drop00.png";
	game.gameRenderer.ballImage3 = new Image();
	game.gameRenderer.ballImage3.src = "images/flowers/drop02.png";
	
	game.gameRenderer.staticImage = new Image();
	game.gameRenderer.staticImage.src = "images/ww3/kim.png";
	
	game.gameRenderer.backgroundImage.src = "images/flowers/lawn.jpg"
	
	

	if(audio)
	{
		game.gameRenderer.launch = new McAudio("/audio/Water Drop-SoundBible.com-2039669379.mp3");
	}
	else
	{
		game.gameRenderer.launch = null;
	}
	
	
	
	game.gameRenderer.staticImage.src = "images/ww3/kim.png";
	
	game.gameRenderer.boomRed = new Image();
	game.gameRenderer.boomRed.src = "images/boomRed.png";
	
	
	game.gameControl.setupControls();
	
	var toSend = {"sessionString":"{game: fig,width:"+canvas.width+",height:"+canvas.height+"}","gameName":"fig"};
	var xHttp = new XhttpClient("/model/GameSession/add");
	xHttp.post("data="+JSON.stringify(toSend));
	//game.gameState.fire(0,-0.25);
	//game.gameState.fire(0.01983406792844178,0.03072336012444904);
	//game.gameState.fire(0.0964912280701754,-0.2929824561403509);
	//game.gameState.fire(-0.011498688069146445,-0.30567988887173947);
	//game.gameState.fire(0.17174515235457066,-0.2721606648199446);
	if(!audio)
	{
		game.switchGameState(game.gameMain);
		game.start();
	}
	else
	{
		setupIntro();
		game.extendedState = true;
		game.switchGameState(game.gameIntro);
		//game.start();
	}
	//game.start();
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
	game.gameMain.advanceStaticObjects = function()
	{
		
	}
	
	game.gameMain.setupStaticGameObjects = function()
	{
		var t = new Random(Date.now());
		for(var i = 0; i<10;i++)
		{
			for(var j = 0; j<4;j++)
			{
				var r = t.nextDouble();
				r = 1;
				if(r>0.5)
				{
					var ii = -0.4+i*.1;
					var jj = 0+j*.1;
					var so = createStaticObject(ii,jj,0.05,0.05,"staticImage"+i+"x"+j,game.gameRenderer.staticImages[staticObjectCount % game.gameRenderer.staticImageCount]);
					//var so = createStaticObject(ii,jj,0.1,0.1);
					so.stage = 0;
					this.staticObjectGroup.childObjectList.push(so);
				}

			}
		}
	}
	game.gameMain.handleMaxHits = function(gameObject)
	{
		gameObject.stage++;
		gameObject.hitCount =0;
		if(gameObject.stage >2)
		{
			gameObject.stage = 3;
		}
		else
		{
			gameObject.size.add1(0.05);
		}
		
	}
	
	game.gameMain.handleBallHit = function(ball)
	{
		ball.hitCount ++;
		if(ball.hitCount>20)
		{
			ball.cull =true;
		}
		else
		{
			ball.size.scale(0.95);
		}
	}
	
	
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