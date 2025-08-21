import Background from "../object2d/Background";
import Game from "../template/gamejs/Game";
import GameRenderer from "../template/gamejs/GameRenderer";
import FigIntroGameState from "./FigIntroGameState";
import FigMainGameState from "./FigMainGameState";


export default class FigGame extends Game{
    
    // intro : FigIntroGameState;
    // mainGame : FigMainGameState;
    constructor(gameRenderer : GameRenderer)
    {

        super(gameRenderer);
    //     this.intro = new FigIntroGameState(this);
    //     let bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
    //     this.mainGame = new FigMainGameState(this,bg);
    //     this.setup();
    }

    // setup()
    // {
       
    // }
} 