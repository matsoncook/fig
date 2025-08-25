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
    /*

 * Draw an image stretched and rotated from point A to point B.
 * A is the center of the left edge; B is the center of the right edge.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement|CanvasImageSource} img
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 * @param {number} [thickness]  Optional height in px; defaults to image's natural height

function drawImageBetweenPoints(ctx, img, ax, ay, bx, by, thickness) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  if (len === 0) return;

  const angle = Math.atan2(dy, dx);
  const h = thickness ?? (img.naturalHeight || img.height || 10);

  ctx.save();
  ctx.translate(ax, ay);     // move origin to A
  ctx.rotate(angle);         // rotate so +x axis points toward B

  // Draw with A at the center of the left edge, B at center of right edge
  // x = 0 .. len, y = -h/2 .. +h/2
  ctx.drawImage(img, 0, -h / 2, len, h);

  ctx.restore();
}

    */
   /*
   const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'arrow.png'; // for example, an arrow shaft pointing right
img.onload = () => {
  const A = { x: 80,  y: 120 };
  const B = { x: 360, y: 240 };
  drawImageBetweenPoints(ctx, img, A.x, A.y, B.x, B.y, 24); // thickness = 24px
};

   */
} 