import Background from "../object2d/Background";
import Game from "../template/gamejs/Game";
import FigMainGameState from "./FigMainGameState";


export default class FigGame extends Game{
    
    mainGame : FigMainGameState | null = null;
    setup()
    {
        var bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
        let fgst = new FigMainGameState(this,bg);
    }
} 