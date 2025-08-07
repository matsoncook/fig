//End of circular loading
// window.requestAnimFrame = (function() {
//     return window.requestAnimationFrame ||
//            window.webkitRequestAnimationFrame ||
//            window.mozRequestAnimationFrame ||
//            window.oRequestAnimationFrame ||
//            window.msRequestAnimationFrame ||
//            function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
//              window.setTimeout(callback, 1000/60);
//            };
//   })();
// myLoader = new Loader();
// myLoader.context = context;
// myLoader.canvas = canvas;
// myLoader.animationFrame = null;
// myLoader.exitLoadingAnimation = false;
// myLoader.widthHeightRatio = 1;

import Loader from "./Loader";

export default class LoadHandler {

  widthHeightRatio = 1;
  borderRatio = 0;
  width = 0;
  height = 0;
  exitLoadingAnimation = false;

  animationFrame: any;

  constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D, private loader: Loader) {
    this.drawLoadingProgress = this.drawLoadingProgress.bind(this);
  }
  setSize(windowInnerWidth: number, windowInnerHeight: number) {


    var width = windowInnerWidth;
    var height = windowInnerHeight;

    this.canvas.width = width;
    this.canvas.height = height



    if (width * this.widthHeightRatio > height) {
      width = Math.floor(height / this.widthHeightRatio);
    }
    else {
      height = width * this.widthHeightRatio;
    }
    width = width - width * this.borderRatio;
    height = height - height * this.borderRatio;


    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  drawLoadingProgress() {
    this.loader.draw(this.canvas, this.context);

    if (this.exitLoadingAnimation) {
      this.exitLoadingAnimation = false;
      window.cancelAnimationFrame(this.animationFrame);
    }
    else {
      this.animationFrame = window.requestAnimationFrame(this.drawLoadingProgress);
    }
  }

  stop() {
    this.exitLoadingAnimation = true;
  }
}



//myLoader.setSize(window.innerWidth, window.innerHeight);
// myLoader.stop = function() {
//   myLoader.exitLoadingAnimation = true;
// }

// var drawLoadingProgress = function() {
//   myLoader.draw(canvas, context);

//   if (myLoader.exitLoadingAnimation) {
//     myLoader.exitLoadingAnimation = false;
//     window.cancelAnimationFrame(myLoader.animationFrame);
//   }
//   else {
//     animationFrame = window.requestAnimFrame(drawLoadingProgress);
//   }
// }

//myLoader.animationFrame = window.requestAnimFrame(drawLoadingProgress);
