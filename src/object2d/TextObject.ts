import GameObject from "../template/gamejs/GameObject";
import GameRenderer from "../template/gamejs/GameRenderer";
import WorldObjectType from "../template/gamejs/WorldObjectType";
import { Point2d } from "../transform/Point2d";

export default class TextObject extends GameObject
{
  static HorizontalJustification = {Center:0,Left:1,Right:2};
  static VerticalJustification = {Center:1,Top:0,Bottom:2};

  text = "text";

  doFill = true;
  fillStyle = "red";

  doStroke = false;
  strokeStyle = "none";

  lineWidth = 3;

  font = "Arial";
  bold = "";
  italic = "";

  size = new Point2d(0.1,0.1);
  scaleWidth = false;

  screenPosition = new Point2d();
  screenSize = new Point2d();

  textAlign = "center";
  horizontalJustification = TextObject.HorizontalJustification.Center;
  verticalJustification = TextObject.VerticalJustification.Center;

  // static createTextObject2(name : string,text : string)
  // {
  //   var to = createTextObject2d(text);
  //   to.name=name;
  //   return to;
  // }
  static createTextObject2d(text : string) : TextObject
  {


    var go = new TextObject(WorldObjectType.Text,"text");


    go.text = text;

    go.doFill = true;
    go.fillStyle = "red";

    go.doStroke = false;
    go.strokeStyle = "none";

    go.lineWidth = 3;

    go.font = "Arial";
    go.bold = "";
    go.italic = "";

    go.size.set2(0.1,0.1);
    go.scaleWidth = false;

    go.screenPosition = new Point2d();
    go.screenSize = new Point2d();

    go.textAlign = "center";
    go.horizontalJustification = TextObject.HorizontalJustification.Center;
    go.verticalJustification = TextObject.VerticalJustification.Center;

    return go;

  }
  setHorizontalJustification(horiz : number)
    {
      this.horizontalJustification = horiz;
      if(this.horizontalJustification == TextObject.HorizontalJustification.Center)
      {
        this.textAlign = "center";
      }
      else if(this.horizontalJustification == TextObject.HorizontalJustification.Left)
      {
        this.textAlign = "left";
      }
      else if(this.horizontalJustification == TextObject.HorizontalJustification.Right)
      {
        this.textAlign = "right";
      }
      return this;
    }
  setVerticalJustification(vert: number)
    {
      this.verticalJustification = vert;
      /*if(this.verticalJustification == VerticalJustification.Center)
      {
        this.textAlign = "center";
      }
      else if(this.verticalJustification == VerticalJustification.Top)
      {
        this.textAlign = "left";
      }
      else if(this.verticalJustification == VerticalJustification.Bottom)
      {
        this.textAlign = "right";
      }*/
      return this;
    }

   setStrokeStyle(strokeStyle : string)
    {
      this.strokeStyle = strokeStyle;
      this.doStroke = (this.strokeStyle !="none");
      return this;

    }
    setFillStyle(fillStyle: string)
    {
      this.fillStyle = fillStyle;
      this.doFill = (this.fillStyle !="none");
      return this;

    }
    setLineWidth(lineWidth: number)
    {
      this.lineWidth = lineWidth;

      return this;

    }

  render(gameRenderer : GameRenderer)
    {
      var posX = 0;
      var posY = 0;
      var sizeX = 0;
      var sizeY = 0;
      if(this.usingViewPort ) //gameObject
      {
        var viewPort = this.viewPort;
        viewPort.viewPortToCanvasP(this.position,this.screenPosition);
        viewPort.viewPortToCanvasSizeP(this.size,this.screenSize);
        posX = this.screenPosition.x;
        posY = this.screenPosition.y;
        sizeX = this.screenSize.x;
        sizeY = this.screenSize.y;
      }
     
        
      else
      {
        posX = gameRenderer.gameToCanvasX(this.position.x);
        posY = gameRenderer.gameToCanvasY(this.position.y);
        sizeX = gameRenderer.gameToCanvasSizeX(this.size.x);
        sizeY = gameRenderer.gameToCanvasSizeY(this.size.y);
      }


      var font = this.italic + this.bold + "" + sizeY + "px " + this.font;
      var context = gameRenderer.context;
      context.font = font;

      var vertPos = posY+((sizeY/2) * this.verticalJustification) ;

      if(this.scaleWidth)
      {
        context.save();
        var metrics = context.measureText(this.text);
        var scaleX = sizeX/metrics.width;
        context.translate(posX,vertPos);
        context.scale(scaleX, 1);


        context.fillStyle = this.fillStyle;
        //context.textAlign = CanvasTex;

        context.strokeText(this.text,0,0);
        context.fillText(this.text,0,0);

        context.restore();
      }
      else
      {


        //context.textAlign = this.textAlign;
        if(this.doStroke)
        {
          context.lineWidth = this.lineWidth;
          context.strokeStyle = this.strokeStyle;
          context.strokeText(this.text,posX,vertPos);
        }
        if(this.doFill)
        {
            context.fillStyle = this.fillStyle;
            context.fillText(this.text,posX,vertPos);
            //console.log(this.name + " " + this.text);
        }


      }

    }

  setBold(isBold : boolean)
    {
      if(isBold)
      {
        this.bold = "bold ";

      }
      else
      {
        this.bold = "";
      }

    }
    setItalic(isItalic : string)
    {
      if(isItalic)
      {
        this.italic = "italic ";

      }
      else
      {
        this.italic = "";
      }

    }
    setFontArial()
    {
      this.font = "Arial";
    }
    setFontComicSansMS()
    {
      this.font = "Comic Sans MS";
    }


}





