import SwirlLoader from "./loader/SwirlLoader";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let sw = new SwirlLoader();
sw.drawSwirl();