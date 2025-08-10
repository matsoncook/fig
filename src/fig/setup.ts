import Game from "../template/gamejs/Game";
import GameRenderer from "../template/gamejs/GameRenderer";

function setupGame(canvas:HTMLCanvasElement,controlCanvas :HTMLCanvasElement,audio :any)
{
  //testLineSegmentIntersecter();
  let gameRenderer = new GameRenderer(canvas,controlCanvas);
  gameRenderer.setSize(window.innerWidth,window.innerHeight);
  let game = new Game(gameRenderer);

  
  /*
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
  */
}