import FigGame from "./fig/FigGame";
import FigIntroGameState from "./fig/FigIntroGameState";


import LoadHandler from "./loader/LoadHandler";
import SwirlLoader from "./loader/SwirlLoader";

import GameRenderer from "./template/gamejs/GameRenderer";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let gameRenderer = new GameRenderer(canvas,canvas);

function resizeCanvas() 
{
  const dpr = window.devicePixelRatio || 1;

  gameRenderer.setSize(window.innerWidth,window.innerHeight);
}

// Resize initially and whenever window changes
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


let loader = new LoadHandler(canvas, ctx, new SwirlLoader());
loader.setSize(window.innerWidth, window.innerHeight);
loader.drawLoadingProgress();


let figGame : FigGame = new FigGame(gameRenderer);




function intro()
{
  figGame.gameRenderer.setSize(window.innerWidth,window.innerHeight);
  figGame.switchGameState(figGame.gameIntro);
  figGame.setup();
  figGame.start();
}

setTimeout(() => {
  loader.stop();
  intro();
}, 500); 

//intro();



