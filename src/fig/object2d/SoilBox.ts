import McImage from "../../image/McImage";
import ImageObject from "../../object2d/ImageObject";
import GameRenderer from "../../template/gamejs/GameRenderer";
import WorldObjectType from "../../template/gamejs/WorldObjectType";
import { Point2d } from "../../transform/Point2d";

export default class SoilBox extends ImageObject
{
    slots : Point2d[] = [];
    constructor(position : Point2d, size : Point2d)
    {
        super(WorldObjectType.ImageObject,"SoilBox")

        this.mcImage = new McImage("images/flowers/soil.png",()=>{});

        this.position.set1(position);
        this.size.set1(size);

        this.createSlots();
    }

    createSlots()
    {
        this.slots.push(new Point2d().set1(this.position));

        let quarteSizeX = this.size.x/4;
        let quarteSizeY= this.size.y/4;

        this.slots.push(new Point2d().set2(this.position.x - quarteSizeX,this.position.y - quarteSizeY ));
        this.slots.push(new Point2d().set2(this.position.x + quarteSizeX,this.position.y - quarteSizeY ));
        this.slots.push(new Point2d().set2(this.position.x - quarteSizeX,this.position.y + quarteSizeY ));
        this.slots.push(new Point2d().set2(this.position.x + quarteSizeX,this.position.y + quarteSizeY ));


    }

    render(gameRenderer: GameRenderer): void {
        if(this.cull)return;
        var posX = gameRenderer.gameToCanvasX(this.position.x);
        var posY = gameRenderer.gameToCanvasY(this.position.y);
        var sizeX = gameRenderer.gameToCanvasSizeX(this.size.x);
        var sizeY = gameRenderer.gameToCanvasSizeY(this.size.y);
        var context = gameRenderer.context;
        var halfSizeX = sizeX/2;
        var halfSizeY = sizeY/2;
        if(this.mcImage?.isComplete())
        {

            context.drawImage(this.mcImage!.image,posX-halfSizeX,posY-halfSizeY,sizeX,sizeY);
        }
    }
}