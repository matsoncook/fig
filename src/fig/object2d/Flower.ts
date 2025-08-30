import StaticObject from "../../pong2/StaticObject";
import WorldObjectType from "../../template/gamejs/WorldObjectType";
import Stepper from "../../transform/Stepper";

export default class Flower extends StaticObject{
    constructor(posX: number, posY: number, sizeX: number, sizeY: number, name: string, staticImage: HTMLImageElement)
    {
        super(WorldObjectType.ImageObject,name);

        this.size.set(sizeX,sizeY);
        this.position.set(posX,posY);
        this.hitCount=0;
        this.staticImage = staticImage;


        this.verticalScaleStepper = new Stepper(0.8,1,0.01);
        this.verticalScaleStepper.current = .7+StaticObject.random.nextDouble()/3.3;
        this.skewStepper = new Stepper(-0.1,.1,StaticObject.random.nextDouble()/50);
        this.skewStepper.current = -0.1+StaticObject.random.nextDouble()/5;
    }
}