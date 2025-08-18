import GameObject from "../template/gamejs/GameObject";
import WorldObjectType from "../template/gamejs/WorldObjectType";

export default class Ball extends GameObject{
    
    static createBall() : Ball
    {
        return new Ball(WorldObjectType.ImageObject,"Ball");
    }

	reset() {
       this.hitCount = 0;
		this.size.set(0.05,0.1);
		this.position.set(0,-0.45);

		this.velocity.set(0.01,0.01);
    }

	changeDirection = function(boundsX : number,boundsY: number)
		{

			// if(this.position.x > boundsX)
			// {	
			// 	this.velocity.x = -this.velocity.x;
			// 	this.position.x = boundsX - (this.position.x - boundsX);
			// 	this.hitCount++;
			// }
			// if(this.position.x < -boundsX)
			// {			
			// 	this.velocity.x = -this.velocity.x;
			// 	this.position.x = -boundsX + (this.position.x + boundsX);
			// 	this.hitCount++;
			// }
			
			// if(this.position.y > boundsY)
			// {			
			// 	this.velocity.y = -this.velocity.y;
			// 	this.position.y = boundsY - (this.position.y - boundsY);
			// 	this.hitCount++;
			// }
			// if(this.position.y < -boundsY)
			// {
			// 	// this.velY = - this.velY;
			// 	// this.posY = -boundsY + (this.posY + boundsY  );
			// 	this.reset();
			// 	this.velocity.set(0,0);
			// 	this.cull = true;
			// 	this.cullSound.play();
			// }
			
		}
}

/*
var ballCount = 0;

function createBall(preInitialise)
{

	var ball = new GameObject(0,"Ball"+ballCount);
	ballCount++;
	var preInit = preInitialise;
	if(preInit==null)
	{
		preInit = function(ball)
		{
			ball.launchSound = createAudioObject("/audio/Laser Blasts-SoundBible.com-108608437.mp3");
			ball.cullSound = createAudioObject("/audio/Water Droplet-SoundBible.com-854529508.mp3");
			ball.hitSound = createAudioObject("/audio/Water Drop-SoundBible.com-2039669379.mp3");
			
		}
	}
	preInit(ball);
	
	ball.initialise = function()
	{
		var ball = this;
		ball.addChildObject(ball.launchSound);
		ball.addChildObject(ball.cullSound);
		ball.addChildObject(ball.hitSound);
		ball.playLaunchSound = function()
		{
			this.launchSound.play();
		}

		ball.size.set(0.05,0.1);

		ball.reset = function()
		{
			this.hitCount = 0;
			this.size.set(0.05,0.1);
			this.position.set(0,-0.45);

			this.velocity.set(0.01,0.01);
			
		}
		ball.reset();
		
		
		ball.beforeAdvance = function(time)
		{

			this.position.add(this.velocity);
			
		}
		ball.changeDirection = function(boundsX,boundsY)
		{

			if(this.position.x > boundsX)
			{	
				this.velocity.x = -this.velocity.x;
				this.position.x = boundsX - (this.position.x - boundsX);
				this.hitCount++;
			}
			if(this.position.x < -boundsX)
			{			
				this.velocity.x = -this.velocity.x;
				this.position.x = -boundsX + (this.position.x + boundsX);
				this.hitCount++;
			}
			
			if(this.position.y > boundsY)
			{			
				this.velocity.y = -this.velocity.y;
				this.position.y = boundsY - (this.position.y - boundsY);
				this.hitCount++;
			}
			if(this.position.y < -boundsY)
			{
				// this.velY = - this.velY;
				// this.posY = -boundsY + (this.posY + boundsY  );
				this.reset();
				this.velocity.set(0,0);
				this.cull = true;
				this.cullSound.play();
			}
			
		}
		ball.imageStepper = new Stepper(0,8,1);
		ball.render = function(gameObject,gameRenderer)
		{
			if(this.cull)return;
			var posX = gameRenderer.gameToCanvasX(this.position.x);
			var posY = gameRenderer.gameToCanvasY(this.position.y);
			var sizeX = gameRenderer.gameToCanvasSizeX(this.size.x);
			var sizeY = gameRenderer.gameToCanvasSizeY(this.size.y);
			var context = gameRenderer.context;
			var halfSizeX = sizeX/2;
			var halfSizeY = sizeY/2;
			
			//This could be encapsulated into its own class
			context.save();
			
			//var rad = this.velocity.x / this.velocity.y;
			var rad = Math.atan2(this.velocity.y, this.velocity.x);
			
			rad = Math.PI/2 - rad;
		    //context.rotate(degrees*Math.PI/180);
			context.translate(posX,posY);
			context.rotate(rad);
			
			context.translate(-halfSizeX,-halfSizeY);
			
			//console.log("posX(" + posX + "," + posY + ") rad: "+ rad);
			
			if(option1>=maxOption) option1 = 0;
			
			option2 = Math.floor((option1)/divOption);
			option1++;
			
			var is = this.imageStepper.next();
			
			is = Math.floor(is/3);
			
			if(is == 0 ) context.drawImage(game.gameRenderer.ballImage1,0,0,sizeX,sizeY);
			if(is == 1 ) context.drawImage(game.gameRenderer.ballImage2,0,0,sizeX,sizeY);
			if(is == 2 ) context.drawImage(game.gameRenderer.ballImage3,0,0,sizeX,sizeY);
			
			
			
			context.restore();
			
			posX = gameRenderer.gameToCanvasX(this.position.x);
			posY = gameRenderer.gameToCanvasY(this.position.y);
			
			//crossHairs01(context,posX,posY,sizeX,sizeY);
			//drawRectCentered(context,posX,posY,sizeX,sizeY);
			
			// context.save();
			// context.translate(posX,posY);
			// context.rotate(rad);
			

			// crossHairs01(context,0,0,sizeX,sizeY);
			// drawRectCentered(context,0,0,sizeX,sizeY);
			// context.restore();
		}
		ball.intersects = function(staticObject)
		{

			// var sizeX = (invader.size.x + this.velocity.x)/2;
			// var sizeY = (invader.size.y + this.velocity.y)/2;
			// var distX = Math.abs(invader.position.x - this.position.x);
			// var distY = Math.abs(invader.position.y - this.position.y);
			
			// if(distX < sizeX && distY < sizeY)
			// {
			// 	return true;
			// }
			return false;
		}
	}
	
	

	ball.initialise();
	return ball;
	

}
var option1 = 0;
var option2 = 0;
var maxOption = 15;
var divOption = maxOption/3;
*/