import LoadHandler from "./loader/LoadHandler";
import SwirlLoader from "./loader/SwirlLoader";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if(ctx)
{
  let loader = new LoadHandler(canvas, ctx, new SwirlLoader());
  loader.setSize(window.innerWidth, window.innerHeight);
  loader.drawLoadingProgress();
}


