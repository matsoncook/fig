import GameObject from "../template/gamejs/GameObject";
import GameRenderer from "../template/gamejs/GameRenderer";
import { Point2d } from "../transform/Point2d";

export default class Aimer extends GameObject{
    to:Point2d = new Point2d();
    visible = false;
    render(gameRenderer: GameRenderer)
    {
        if(!this.visible)return;

        var posX = gameRenderer.gameToCanvasX(this.position.x);
        var posY = gameRenderer.gameToCanvasY(this.position.y);
        var toX = gameRenderer.gameToCanvasX(this.to.x);
        var toY = gameRenderer.gameToCanvasY(this.to.y);
        var context = gameRenderer.context;
        context.strokeStyle="#FF00FF";
        context.beginPath();
        context.moveTo(posX, posY);
        context.lineTo(toX, toY);
        //context.rect(posX-sizeX/2,posY-sizeY/2,sizeX,sizeY);
        context.stroke();
        context.closePath();

    }
} 