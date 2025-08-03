//Start of slider loading
var iter = 0;
var maxIter = 10;
var loading = true;


function drawLoadingProgress()
{
    if(iter>maxIter)
    {
        iter = 0;   
    }
    var posX = canvas.width/2;
    var posY = canvas.height/2;
    var sizeX = 300;
    var sizeY = 50;
    context.fillStyle = "#00ff00";
    context.strokeStyle = "#ff0000";
    context.clearRect(posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
    context.fillRect(posX-sizeX/2,posY-sizeY/2,Math.floor(sizeX * (iter/maxIter)),sizeY);
    context.beginPath();
        
    context.rect(posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
    //context.fillRect(0,0,500,500);
    context.stroke();
    context.closePath();
    iter++;
    if(loading )
    {
    	window.requestAnimFrame(drawLoadingProgress);
        //setTimeout(drawLoadingProgress,200);
    }
    
}
//window.requestAnimFrame(drawLoadingProgress1);
//End of slider loading