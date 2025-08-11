import FigGame from "./fig/setup";
import LoadHandler from "./loader/LoadHandler";
import SwirlLoader from "./loader/SwirlLoader";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  // Set canvas size in physical pixels
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // Set canvas style size in CSS pixels
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  // Scale context to match device pixel ratio
  ctx?.scale(dpr, dpr);
}

// Resize initially and whenever window changes
resizeCanvas();
window.addEventListener("resize", resizeCanvas);



if(ctx)
{
  let loader = new LoadHandler(canvas, ctx, new SwirlLoader());
  loader.setSize(window.innerWidth, window.innerHeight);
  loader.drawLoadingProgress();
}


function intro()
{
  let figGame = new FigGame();
  figGame.setupGame(canvas,canvas,true);
}

intro();



