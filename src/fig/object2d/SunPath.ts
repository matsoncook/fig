import { Point2d } from "../../transform/Point2d";
import PointStepper from "../../transform/PointStepper";
import Stepper from "../../transform/Stepper";
import Sun from "./Sun";

export default class SunPath
{
    pathStepperX = new PointStepper();
    pathStepperY = new Stepper();

    speed = 100;

    currentPosition = new Point2d();
    
    constructor(private sun : Sun,
        private from: Point2d = new Point2d(), 
        private to: Point2d= new Point2d())
    {
        
    }
    setPath(from: Point2d,to: Point2d) {
        this.from.set1(from);
        this.to.set1(to);  
        
        let speedX = (to.x - from.x) / this.speed;
        let speedY = (to.y - from.y) / this.speed;

        this.pathStepperX.set(from.x,to.x,this.speed,false);
        this.pathStepperY.set(from.y,to.y,speedY);
    }
    next()
    {
        this.pathStepperX.advance(0);
        this.pathStepperY.next();

        this.pathStepperX.onComplete((s)=>{
            s.active=false;
            this.sun.removeFromParent();
        })

        this.pathStepperY.checkGotToTo((s)=>{
            s.pause()
        })
    }
    setPosition(position : Point2d)
    {
        position.x = this.pathStepperX.currentValue;
        position.y = this.pathStepperY.current;
    }
}