import GameObject from "../template/gamejs/GameObject";
import WorldObjectType from "../template/gamejs/WorldObjectType";

export default class ImageObject extends GameObject
  {
    constructor(name : string)
    {
      super(WorldObjectType.ImageObject,name)
    }
  }