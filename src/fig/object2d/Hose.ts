import McImage from "../../image/McImage";
import ImageObject from "../../object2d/ImageObject";
import GameRenderer from "../../template/gamejs/GameRenderer";
import WorldObjectType from "../../template/gamejs/WorldObjectType";
export default class Hose extends ImageObject{

    constructor(source : string)
    {
        super(WorldObjectType.ImageObject,"Hose");
        this.mcImage = new McImage(source,()=>{});
        this.size.set2(.05,.2);
        this.position.set2(0,-0.5);
        this.velocity.set2(0,1);


    }
    

    render(gameRenderer : GameRenderer)
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
        
        
        context.drawImage(this.mcImage!.image,0,0,sizeX,sizeY)
        
        context.restore();
        
        posX = gameRenderer.gameToCanvasX(this.position.x);
        posY = gameRenderer.gameToCanvasY(this.position.y);
        
    }
}