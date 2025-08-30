import GameObject from "../template/gamejs/GameObject";
import WorldObjectType from "../template/gamejs/WorldObjectType";

export default class GroupObject extends GameObject
{
  constructor(
     name : string
  )
  {
    super(WorldObjectType.GroupObject,name);
  }

  removeChild()
  {
    
  }
}