import McImage from "../../image/McImage";
import ImageObject from "../../object2d/ImageObject";
import GameRenderer from "../../template/gamejs/GameRenderer";
import WorldObjectType from "../../template/gamejs/WorldObjectType";
import { Point2d } from "../../transform/Point2d";
export default class Hose extends ImageObject{
    to : Point2d = new Point2d();
    vector : Point2d = new Point2d();
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
        var halfSizeX = sizeX;
        var halfSizeY = sizeY/2;
        
        //This could be encapsulated into its own class
        context.save();
        
        this.vector.set1(this.to);
        this.vector.subtract(this.position);

        var rad = Math.atan2(this.vector.y, this.vector.x);
        // rad = rad + Math.PI;
        rad = -((rad) +(Math.PI/2));

     
        context.translate(posX,posY);
        context.rotate(rad);
        context.translate(-sizeX/2,0);

        
        
        context.drawImage(this.mcImage!.image,0,0,sizeX,sizeY)
        
        context.restore();
        
        posX = gameRenderer.gameToCanvasX(this.position.x);
        posY = gameRenderer.gameToCanvasY(this.position.y);
        
    }
}