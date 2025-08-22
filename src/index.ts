import FigGame from "./fig/FigGame";
import FigIntroGameState from "./fig/FigIntroGameState";
import SetupFigGame from "./fig/setup";

import LoadHandler from "./loader/LoadHandler";
import SwirlLoader from "./loader/SwirlLoader";
import Intro from "./pong2/Intro";
import GameRenderer from "./template/gamejs/GameRenderer";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  // Set canvas size in physical pixels
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // Set canvas style size in CSS pixels
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  // Scale context to match device pixel ratio
  ctx.scale(dpr, dpr);
}

// Resize initially and whenever window changes
resizeCanvas();
window.addEventListener("resize", resizeCanvas);




let loader = new LoadHandler(canvas, ctx, new SwirlLoader());
loader.setSize(window.innerWidth, window.innerHeight);
loader.drawLoadingProgress();

let gameRenderer = new GameRenderer(canvas,canvas);
let figGame : FigGame = new FigGame(gameRenderer);
figGame.switchGameState(figGame.gameIntro);



function intro()
{
  // let figGame = new SetupFigGame();
  // figGame.setupGame(canvas,canvas,true);
  
  let intro = new FigIntroGameState(figGame);
  //intro.createGameIntro();
  intro.initialise();
  intro.setupGameObjects();

  figGame.gameState = intro;
  figGame.gameIntro = intro;
  figGame.setup();
  figGame.start();
}

setTimeout(() => {
  loader.stop();
  intro();
}, 500); 

//intro();



