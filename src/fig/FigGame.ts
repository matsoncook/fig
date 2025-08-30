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
        this.configureGameRenderer();
        
        let fgi = new FigIntroGameState(this);
        fgi.initialise();
        fgi.setupGameObjects();

        this.gameIntro = fgi;


        let bg = Background.createBackgroundImageObject("images/flowers/lawn.jpg");
        this.gameMain = new FigMainGameState(this,bg);
        this.gameMain.setup();
    }

    configureGameRenderer()
    {
        let gameRenderer = this.gameRenderer;
        gameRenderer.setSize(window.innerWidth,window.innerHeight);
        gameRenderer.staticImageCount = 8;

       for(var i = 0;i<gameRenderer.staticImageCount;i++)
        {
          gameRenderer.staticImages[i] = new Image();
        }
        for(var i = 0;i<gameRenderer.staticImageCount;i++)
        {
          gameRenderer.staticImages[i].src="images/flowers/download0"+i+".png";
        }
        gameRenderer.ballImage1.src = "images/flowers/drop01.png";
        gameRenderer.ballImage2.src = "images/flowers/drop00.png";
        gameRenderer.ballImage3.src = "images/flowers/drop02.png";
    }

    // setup()
    // {
       
    // }
} 