
import { Point2d } from "./Point2d";

export default class Random
{
  static seed = 0; 
  static createRandom() : Random
  {
    Random.seed = Random.nextDouble();
    return new Random(Random.seed);
  }
  constructor(private seed : number)
  {
    
  }
  static nextDouble(){
    var x = Math.sin(this.seed++)*1000;
    return x - Math.floor(x);
  }
  nextDouble(){
    var x = Math.sin(this.seed++)*1000;
    return x - Math.floor(x);
  }

  randomPosition(bounds : Point2d,returnPosition: Point2d)
  {
    var x = (bounds.x/2) - (Random.nextDouble()*bounds.x);
    var y = (bounds.y/2) - (Random.nextDouble()*bounds.y);
    returnPosition.set2(x,y);
    returnPosition.scale(0.95);//Regulator
    return returnPosition;
  }


}