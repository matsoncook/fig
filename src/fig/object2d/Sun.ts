import McImage from "../../image/McImage";
import ImageObject from "../../object2d/ImageObject";
import GameRenderer from "../../template/gamejs/GameRenderer";
import WorldObjectType from "../../template/gamejs/WorldObjectType";
import Stepper from "../../transform/Stepper";

export default class Sun extends ImageObject
{

    rotate = 0;
    pathStepperX = new Stepper(0,0.5,.01);
    pathStepperY = new Stepper(0,0.5,.01);

    constructor()
    {
        super(WorldObjectType.ImageObject,"Sun");
        this.mcImage = new McImage("images/sun/sun00.png",()=>{})
        this.size.set(.20,.20);
    }

    advance(time: number): void {
        
    }

    render(gameRenderer: GameRenderer)
      {

        this.position.x = -this.pathStepperX.next();
        this.position.y = this.pathStepperY.next();

        var context = gameRenderer.context;
        var posX = gameRenderer.gameToCanvasX(this.position.x);
        var posY = gameRenderer.gameToCanvasY(this.position.y);
        var sizeX = gameRenderer.gameToCanvasSizeX(this.size.x);
        var sizeY = gameRenderer.gameToCanvasSizeY(this.size.y);
        var halfSizeX = sizeX/2;
        var halfSizeY = sizeY/2;
    
    
        if(!this.cull)
        {
    
    
          if(this.fuseOn)
          {
            var fade = this.fuse/this.fuseCount;
          }
          else
          {

            context.save();

            context.translate(posX,posY);
            this.rotate +=0.01;
            context.rotate(this.rotate);
            context.translate(-sizeX/2,-sizeY/2);

    
    /*
            var vscale = this.verticalScaleStepper.next();
            var posY1 = posY + (1 - sizeY * vscale) +halfSizeY;
    
            var vskew = this.skewStepper.next();

            var posX1 = posX - ( sizeX * vskew) -halfSizeX;
    
            context.setTransform(1,0,vskew,vscale,posX1,posY1);
            */
           //context.setTransform

            context.drawImage(this.mcImage!.image,0,0,sizeX,sizeY);
    
            context.restore();
    

          }
        }
    
        }
}