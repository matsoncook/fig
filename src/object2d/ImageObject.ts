import GameObject from "../template/gamejs/GameObject";
import WorldObjectType from "../template/gamejs/WorldObjectType";

export default class ImageObject extends GameObject
  {
    constructor(worldObjectType : WorldObjectType = WorldObjectType.ImageObject, name : string)
    {
      super(worldObjectType,name)
    }
  }