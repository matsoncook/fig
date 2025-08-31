//import { Color } from "three";
import MFunction from "../MFunction";
import LerpFunction from "../LerpFunction";
import LerpFunctions from "../LerpFunctions";

class SmoothStepFunction implements MFunction<number>{
    get(t: number): number {
        var a1 = t*t;
        var b1 = 1- ((1-t) * (1-t));
        var c1 : number = LerpFunctions.LerpNumber(t,a1,b1); 
        return c1;
    }

}
//https://easings.net/#easeOutBounce
class EaseOutBounceFunction implements MFunction<number>{
    get(x: number): number{
    
        const n1 = 7.5625;
        const d1 = 2.75;
        
        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
        return 0;
    }       
}


export default class MFunctions{
    public static LerpNumber: LerpFunction<number> = (t : number, a : number, b : number) => {
        return a + t * (b - a);
    }
    // public static LerpColorAlpha: LerpFunction<Color> = (t : number, a : Color, b : Color) => {
    //     const c : Color = a.clone();
    //     return c.lerp(b, t);
    // }
    static SmoothStep : MFunction<number> = new SmoothStepFunction();
    static EaseOutBounce: MFunction<number> = new EaseOutBounceFunction();

}
