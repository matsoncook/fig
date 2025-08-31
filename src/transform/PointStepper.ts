
// import Animatable from "../animation/Animatable";
// import Timing from "../animation/Timing";

export default class PointStepper {//implements Animatable{
    currentValue : number =0;
    exec = (currentValue:number) => {};
    currentStep : number = 0;
    stopped : boolean = false;
    stepCount : number = 0;
    isReversed: any;
    private _active: boolean = false;

    complete : boolean = false;
    
    constructor(private from : number,private to : number,private stepNumber : number, private reverse : boolean )
    {
        this.currentValue = from;
        this.setup(from,to ,stepNumber);
        
    }
    setup(from: number, to: number, stepNumber: number) {
        this.stepCount = 0;
        this.currentStep = (to - from)/stepNumber ;
    }
    advance(now: number)//timing: Timing): void 
    {
        if(this._active)
        {
            this.doAdvance(now);//(timing);
        }
    }
    doAdvance(now: number)//timing: Timing): void 
    {
        this.stepCount ++;
        this.currentValue += this.currentStep;
        this.exec(this.currentValue);
        this.complete = false;
        if(this.stepCount == this.stepNumber)
        {
            this.complete = true;
            if(this.reverse)
            {
                if(this.isReversed)
                {
                    this.isReversed = false;
                    this.setup(this.to ,this.from,this.stepNumber);
                }
                else
                {
                    this.isReversed = true;
                    this.setup(this.from,this.to ,this.stepNumber);
                }
                
            }
        }

    }
    onComplete(callback : ()=>void)
    {
        if(this.complete)
        {
            callback();
        }
    }
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }
}