export default class SwirlLoader {


  prevTime = 0;
  thisTime = 0;
  rad = 0;
  timeToTakeOneRevolution = 4000;
  advanceAdj = 1;
  //advanceRad = 0.01
  advanceAcceleration = 1.05;
  revolutionOn = true;
  radRevolutionOff = 0;
  radius = 0;
  lineWidth = 0;

  centerX = 0;
  centerY = 0;
  color = "200,200,200";
  strokeStyle = "#ffffff";



  drawSwirl(canvas : HTMLCanvasElement, context : CanvasRenderingContext2D, angleRad : number, transparency : number) {

    context.save();
    // translate context to center of canvas
    context.translate(this.centerX, this.centerY);

    // rotate 45 degrees clockwise
    context.rotate(angleRad);

    context.fillStyle = "rgba(" + this.color + "," + transparency + ")";
    context.strokeStyle = this.strokeStyle;
    context.beginPath();

    // var inner = canvas.width/4;
    //var outer = canvas.width/2;
    var inner = canvas.width / 2;
    var outer = canvas.width * 2;

    context.moveTo(0, -outer);

    context.bezierCurveTo(outer, 0, 0, inner, 0, 0);


    context.bezierCurveTo(inner, 0, 0, -outer, -outer, 0);


    context.stroke();
    context.fill();


    context.restore();


  }


  draw(canvas : HTMLCanvasElement, context : CanvasRenderingContext2D) {
    if (this.thisTime == 0) {
      this.thisTime = Date.now();
    }
    this.prevTime = this.thisTime;
    this.thisTime = Date.now();
    var diffTime = this.thisTime - this.prevTime;

    context.clearRect(0, 0, canvas.width, canvas.height);

    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;

    var aspect = canvas.width > canvas.height ? canvas.height : canvas.width;

    var radius = aspect / 4;
    this.radius = radius;

    this.lineWidth = aspect / 40;


    while (this.rad > 2 * Math.PI) {
      this.rad = this.rad - 2 * Math.PI;
      this.radRevolutionOff = this.rad;
      this.revolutionOn = !this.revolutionOn;
      if (this.revolutionOn == false) {
        this.advanceAdj = 1;
      }
    }

    var advanceRad = (2 * Math.PI) * diffTime / this.timeToTakeOneRevolution;

    this.advanceAdj = this.rad < Math.PI ? this.advanceAdj * this.advanceAcceleration : this.advanceAdj / this.advanceAcceleration;

    this.advanceAdj = this.advanceAdj < 1 ? 1 : this.advanceAdj;

    //advanceAdj = 1;
    this.rad = this.rad + (advanceRad * this.advanceAdj);//0.01 * advanceTimeAdj;

    var finalRad = this.revolutionOn ? this.rad : this.radRevolutionOff;
    finalRad -= Math.PI / 2;
    // var x = Math.cos(finalRad) * radius;
    // var y = Math.sin(finalRad) * radius;

    var tranparency = this.revolutionOn ? 1 : (Math.sin(this.rad + (2 * Math.PI)) + 1) / 2;

    this.drawSwirl(canvas, context, finalRad, tranparency);
    this.drawSwirl(canvas, context, finalRad + Math.PI, tranparency);

  }
}
//End of swirly loading

