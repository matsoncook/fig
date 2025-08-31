import { Color } from "three";
import LerpFunction from "./LerpFunction";

export default class LerpFunctions<LerpType>{
    public static LerpNumber: LerpFunction<number> = (t : number, a : number, b : number) => {
        return a + t * (b - a);
    }
    public static LerpColorAlpha: LerpFunction<Color> = (t : number, a : Color, b : Color) => {
        const c : Color = a.clone();
        return c.lerp(b, t);
    }
}