import GameState from "./GameState";
import GameRenderer from "/home/runner/workspace/src/template/gamejs/GameRenderer";

export default class GameAnimation {
   
    animationOn = false;
    animationId = null;

    timeIntervalMilli = 50;
    timeAdvanceMultiple = 0.05;
    animationFrame : number = 0;
    canvas = null;

    
    constructor( private _gameState: GameState, private _gameRenderer: GameRenderer)
    {
      
    }

    moveOneTick()
    {


        var gol = this._gameState.gameObjectList;
        var gr = this._gameRenderer;
        var gs = this._gameState;

        var now = Date.now();
        gs.advance(now);		
        gr.render(now,this._gameRenderer.context,gol);

        this.animationFrame = window.requestAnimationFrame(this.moveOneTick);

    }
 
    stopAnimation() {
        
    }
    startAnimation() {
        window.requestAnimationFrame = (function() {
          return window.requestAnimationFrame ||
                 // window.webkitRequestAnimationFrame ||
                 // window.mozRequestAnimationFrame ||
                 // window.oRequestAnimationFrame ||
                 // window.msRequestAnimationFrame ||
                 function(callback : any,  element :any) {
                   window.setTimeout(callback, 1000/60);
                 };
        })();
    }
    public get gameRenderer(): GameRenderer {
        return this._gameRenderer;
    }
    public set gameRenderer(value: GameRenderer) {
        this._gameRenderer = value;
    }
    public get gameState(): GameState {
        return this._gameState;
    }
    public set gameState(value: GameState) {
        this._gameState = value;
    }

}

/*
function GameAnimation()
{
    this.animationOn = false;
    this.animationId = null;
    this.gameState = null;
    this.gameRenderer = null;
    this.timeIntervalMilli = 50;
    this.timeAdvanceMultiple = 0.05;
    this.animationFrame = null;
    this.canvas = null;


    //mc Hammer
    this.mc = null;

    this.startAnimation = function ()
    {
         this.animationOn = true;
         moveOneTick();
         //this.animationId = window.requestAnimationFrame(moveOneTick);
    }
    this.stopAnimation = function ()
    {
        window.cancelAnimationFrame(this.animationFrame);
    }

    this.collectStats = function()
    {

    }




}

window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             function(callback,  element) {
               window.setTimeout(callback, 1000/60);
             };
    })();


function moveOneTick()
{


    var gol = game.gameState.gameObjectList;
    var gr = game.gameRenderer;
    var gs = game.gameState;
    var animation = game.gameAnimation;

    var now = Date.now();
    gs.advance(now);		
    gr.render(now,game.gameRenderer.context,gol);

    animation.animationFrame = window.requestAnimFrame(moveOneTick);

}



*/