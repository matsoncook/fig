import GameRenderer from "./GameRenderer";

export default class GameControl {
  constructor(private _gameRenderer: GameRenderer, private controlCanvas : HTMLCanvasElement)
  {
    
  }

    

    that = this;
    mouseDetected = false;
    touchDetected = false;
    onMouseDownEvent = (event : MouseEvent)  =>
    {
        //mouseDetected = true;
        if(this.touchDetected)return;
        var rect = this.gameRenderer.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var indexX = this.that.gameRenderer.canvasToGameX(x);
        var indexY = this.that.gameRenderer.canvasToGameY(y);
        this.that.doMouseDownEvent(indexX,indexY);
    }
    doMouseDownEvent = (posX : number,posY: number) =>
    {
        this.that.doClickEvent(posX,posY);
    }
    onMouseMoveEvent= (event : MouseEvent) =>
    {
        //mouseDetected = true;
        if(this.touchDetected)return;
        var rect = this.that.gameRenderer.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var indexX = this.that.gameRenderer.canvasToGameX(x);
        var indexY = this.that.gameRenderer.canvasToGameY(y);
        this.that.doMouseMoveEvent (indexX,indexY);
    }
    doMouseMoveEvent = (posX: number,posY: number) =>
    {
        this.that.doClickEvent(posX,posY);
    }
    onMouseUpEvent = (event: MouseEvent) =>
    {
        //mouseDetected = true;
        if(this.touchDetected)return;
        var rect = this.that.gameRenderer.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        var indexX = this.that.gameRenderer.canvasToGameX(x);
        var indexY = this.that.gameRenderer.canvasToGameY(y);
        this.that.doMouseUpEvent(indexX,indexY);
    }
    doMouseUpEvent = (posX: number,posY: number) =>
    {
        this.that.doClickEvent(posX,posY);
    }
    onTouchStartEvent= (event : TouchEvent) =>
    {

        //if(mouseDetected)return;		
        this.touchDetected = true;
        var touchobj = event.changedTouches[0]; // reference first touch point (ie: first finger)

        var rect = this.that.gameRenderer.canvas.getBoundingClientRect();
        var x = touchobj.clientX - rect.left;
        var y = touchobj.clientY - rect.top;

        var indexX = this.that.gameRenderer.canvasToGameX(x);
        var indexY = this.that.gameRenderer.canvasToGameY(y);
        this.that.doTouchStartEvent(indexX,indexY);
        event.preventDefault();
    }
    doTouchStartEvent = (posX: number,posY: number) =>
    {
        this.that.doClickEvent(posX,posY);
    }
    onTouchMoveEvent = (event : TouchEvent) =>
    {

        //if(mouseDetected)return;		
        this.touchDetected = true;

        var touchobj = event.changedTouches[0]; // reference first touch point (ie: first finger)

        var rect = this.that.gameRenderer.canvas.getBoundingClientRect();
        var x = touchobj.clientX - rect.left;
        var y = touchobj.clientY - rect.top;

        var indexX = this.that.gameRenderer.canvasToGameX(x);
        var indexY = this.that.gameRenderer.canvasToGameY(y);
        this.that.doTouchMoveEvent(indexX,indexY);
        event.preventDefault();
    }
    doTouchMoveEvent= (posX: number,posY: number) =>
    {
        this.that.doClickEvent(posX,posY);
    }
    onTouchEndEvent = (event : TouchEvent) =>
    {

        //if(mouseDetected)return;		
        this.touchDetected = true;

        var touchobj = event.changedTouches[0]; // reference first touch point (ie: first finger)

        var rect = this.that.gameRenderer.canvas.getBoundingClientRect();
        var x = touchobj.clientX - rect.left;
        var y = touchobj.clientY - rect.top;

        var indexX = this.that.gameRenderer.canvasToGameX(x);
        var indexY = this.that.gameRenderer.canvasToGameY(y);
        this.that.doTouchEndEvent(indexX,indexY);
        event.preventDefault();
    }
    doTouchEndEvent = (posX: number,posY: number) =>
    {
        this.that.doClickEvent(posX,posY);
    }

    doClickEvent = (posX: number,posY: number) =>
    {

    }

    // enum KeyCodeEnum
    // {
    // BACKSPACE: 8,
    // }

    keyCodeEnum = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }

    keyEvents = [];


    // addKeyEvent(keyCode : number,doFunction)
    // {
    //     this.keyEvents.push({keyCode:keyCode,doFunction:doFunction});
    // }
    onKeyDownEvent = (e : KeyboardEvent)  =>
    {
        var keyCode = e.keyCode;
        console.log("keyCode " + keyCode)
        for(var i = 0; i < this.that.keyEvents.length; i++)
        {
            // if(this.that.keyEvents[i].keyCode ==  keyCode)
            // {
            //     this.that.keyEvents[i].doFunction();
            // }

        }
    }

    onResize = (event : Event)  =>
    {
        //console.log("resize");

        this.that.doResize();
    }
    doResize()//sizeX: number,sizeY: number)
    {
        console.log("resize");
    }
    onOrientationChange()
    {
        setTimeout(this.that.doOrientationChange, 500);
    }
    doOrientationChange()
    {

    }
    setupControls()
    {
        //https://stackoverflow.com/questions/18928116/javascript-keydown-event-listener-is-not-working?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        this.controlCanvas.setAttribute("tabindex", "0");


        //this.controlCanvas.onkeypress = this.onKeyDownEvent;
        //this.controlCanvas.addEventListener('keypress', this.onKeyDownEvent, false);
        this.controlCanvas.addEventListener('keydown', this.onKeyDownEvent, false);
        this.controlCanvas.addEventListener('mousedown', this.onMouseDownEvent, false);
        this.controlCanvas.addEventListener('mousemove', this.onMouseMoveEvent, false);
        this.controlCanvas.addEventListener('mouseup', this.onMouseUpEvent, false);
        this.controlCanvas.addEventListener('touchstart', this.onTouchStartEvent, false);
        this.controlCanvas.addEventListener('touchmove', this.onTouchMoveEvent, false);
        this.controlCanvas.addEventListener('touchend', this.onTouchEndEvent, false);
        window.addEventListener('resize', this.onResize, false);
        window.addEventListener("orientationchange", this.onOrientationChange, false);

    }




    
    public get gameRenderer(): GameRenderer {
        return this._gameRenderer;
    }
    public set gameRenderer(value: GameRenderer) {
        this._gameRenderer = value;
    }
}