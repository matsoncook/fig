import GameObject from "../../template/gamejs/GameObject";
import WorldObjectType from "../../template/gamejs/WorldObjectType";

export default class Sun extends GameObject
{
    constructor()
    {
        super(WorldObjectType.ImageObject,"Sun");
    }
}