function canvas_arrow(context, fromx, fromy, tox, toy){
    context.beginPath();
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.stroke();
}

function drawLine(context,fromX,fromY,toX,toY)
{
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
}
function drawLineP1(context,p0,p1,lineWidth,fillColor,strokeColor,scale)
{
	context.lineWidth=lineWidth;
	context.fillStyle = fillColor;
	context.strokeStyle = strokeColor;
    context.beginPath();
    context.moveTo(p0.x*scale.x, p0.y*scale.y);
    context.lineTo(p1.x*scale.x, p1.y*scale.y);
    context.stroke();
}
function drawLineP(context,p0,p1)
{

    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.stroke();
}

function drawPointP1(context,p0,lineWidth,fillColor,strokeColor,scale)
{
	context.lineWidth=lineWidth;
	context.fillStyle = fillColor;
	context.strokeStyle = strokeColor;
    context.beginPath();
    context.moveTo(p0.x*scale.x, p0.y*scale.y);
    context.lineTo(p0.x*scale.x, p0.y*scale.y);

    context.stroke();
}

function drawPolygonP(context,pathPoints)
{

	context.beginPath();
	context.moveTo(pathPoints[0].x, pathPoints[0].y);
	for(var i = 1; i < pathPoints.length; i++)
	{
		context.lineTo(pathPoints[i].x, pathPoints[i].y);
	}

	context.closePath();
	context.fill();
}

function fade(context,img,opacity)
{
	context.save();
	context.globalAlpha=opacity;
	context.drawImage(img,0,0);
	context.restore();
}
//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function stringNumberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function drawRectCentered(context,posX,posY,sizeX,sizeY)
{
	//context.strokeStyle=style;
	context.beginPath();
	context.rect(posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
	context.stroke();
	context.closePath();
}

function fillRectCentered(context,posX,posY,sizeX,sizeY)
{
	//context.strokeStyle=style;
	//context.beginPath();
	context.fillRect(posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);

	//context.closePath();
}

function drawImageCentered(context, pImage,posX,posY,sizeX,sizeY)
{
	context.drawImage(pImage,posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
}
function drawImageCenteredFaded(context, pImage,posX,posY,sizeX,sizeY,opacity)
{
	context.save();
	context.globalAlpha=opacity;
	
	context.drawImage(pImage,posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
	context.restore();
}
//Centered Cross hairs
function crossHairs01(context,posX,posY,sizeX,sizeY,style)
{
	if(style == null)
	{
		context.strokeStyle = "#000000"
	}
	else
	{
		context.strokeStyle = style;
	}
	var halfSizeX = Math.floor(sizeX/2);
	var halfSizeY = Math.floor(sizeY/2);
	//var fromX = 
	drawLine(context,posX-halfSizeX,posY,posX+halfSizeX,posY);
	drawLine(context,posX,posY-halfSizeY,posX,posY+halfSizeY);
}

//from
//http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
//Juan Mendes
/**
* Draws a rounded rectangle using the current state of the canvas.
* If you omit the last three params, it will draw a rectangle
* outline with a 5 pixel border radius
* @param {CanvasRenderingContext2D} ctx
* @param {Number} x The top left x coordinate
* @param {Number} y The top left y coordinate
* @param {Number} width The width of the rectangle
* @param {Number} height The height of the rectangle
* @param {Number} [radius = 5] The corner radius; It can also be an object 
*                 to specify different radii for corners
* @param {Number} [radius.tl = 0] Top left
* @param {Number} [radius.tr = 0] Top right
* @param {Number} [radius.br = 0] Bottom right
* @param {Number} [radius.bl = 0] Bottom left
* @param {Boolean} [fill = false] Whether to fill the rectangle.
* @param {Boolean} [stroke = true] Whether to stroke the rectangle.
*/
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
if (typeof stroke == 'undefined') {
  stroke = true;
}
if (typeof radius === 'undefined') {
  radius = 5;
}
if (typeof radius === 'number') {
  radius = {tl: radius, tr: radius, br: radius, bl: radius};
} else {
  var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
  for (var side in defaultRadius) {
    radius[side] = radius[side] || defaultRadius[side];
  }
}
ctx.beginPath();
ctx.moveTo(x + radius.tl, y);
ctx.lineTo(x + width - radius.tr, y);
ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
ctx.lineTo(x + width, y + height - radius.br);
ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
ctx.lineTo(x + radius.bl, y + height);
ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
ctx.lineTo(x, y + radius.tl);
ctx.quadraticCurveTo(x, y, x + radius.tl, y);
ctx.closePath();
if (fill) {
  ctx.fill();
}
if (stroke) {
  ctx.stroke();
}

}



