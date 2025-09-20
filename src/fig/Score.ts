import TextObject from "../object2d/TextObject";
import GameObject from "../template/gamejs/GameObject";
import GameRenderer from "../template/gamejs/GameRenderer";
import WorldObjectType from "../template/gamejs/WorldObjectType";
import { Point2d } from "../transform/Point2d";

export default class Score extends TextObject{
    score = 0;
    maxScore = 5;
    constructor()
    {
        super(WorldObjectType.Text,"Score: ");


        this.setBold(true);
        this.size.set2(0.1,0.15);
        this.position.set2(-0.5,0.5);
        //to.setFontArial();
        this.setFontComicSansMS();
        
        this.text = "Score: " + this.score;
        
        this.doFill = true;
        this.fillStyle = "red";
    
        this.doStroke = false;
        this.strokeStyle = "none";
    
        this.lineWidth = 3;
    
        this.font = "Arial";
        this.bold = "";
        this.italic = "";
    
        this.size.set2(0.1,0.1);
        this.scaleWidth = false;
    
        this.screenPosition = new Point2d();
        this.screenSize = new Point2d();
    
        this.textAlign = "center";
        this.horizontalJustification = TextObject.HorizontalJustification.Right;
        this.verticalJustification = TextObject.VerticalJustification.Bottom;
    }
    isGameFinised() : boolean
    {
        return this.score >= this.maxScore;
    }
    reset()
    {
        this.score = 0;
    }

    render(gameRenderer : GameRenderer)
    {

        this.text = "Score: " + this.score;
        super.render(gameRenderer  );
    }


}