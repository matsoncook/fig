/*
Handles stepping between two numeric values, supporting both increasing and decreasing ranges.
*/

export default class Stepper {

  current = 0;
  multiplier = 1;
  gotToTo = false;
  gotToFrom = false;

  private direction = 1;

  constructor(private from: number = 0, private to: number = 1, private step: number = 1) {
    this.configure(from, to, step);
  }
  set(from: number, to: number, step: number = 1) {
    this.configure(from, to, step);
  }
  private configure(from: number, to: number, step: number) {
    this.from = from;
    this.to = to;
    this.step = Math.abs(step);
    this.direction = this.to >= this.from ? 1 : -1;
    this.current = this.from;
    this.multiplier = this.step === 0 ? 0 : this.direction;
    this.gotToTo = false;
    this.gotToFrom = false;

    if (this.step === 0) {
      this.current = this.to;
    }
  }
  next() {
    this.gotToTo = false;
    this.gotToFrom = false;

    if (this.step === 0 || this.multiplier === 0) {
      return this.current;
    }

    this.current += this.step * this.multiplier;

    if (this.direction >= 0) {
      if (this.current >= this.to) {
        this.current = this.to;
        this.multiplier = -this.direction;
        this.gotToTo = true;
      }
      if (this.current <= this.from) {
        this.current = this.from;
        this.multiplier = this.direction;
        this.gotToFrom = true;
      }
    }
    else {
      if (this.current <= this.to) {
        this.current = this.to;
        this.multiplier = -this.direction;
        this.gotToTo = true;
      }
      if (this.current >= this.from) {
        this.current = this.from;
        this.multiplier = this.direction;
        this.gotToFrom = true;
      }
    }

    return this.current;
  }
  
  pause()
  {
    this.multiplier = 0;
  }
  continue(multiplier = this.direction)
  {
    this.multiplier = this.step === 0 ? 0 : multiplier;
  }
  checkGotToTo(callback : (stepper : Stepper)=>void)
  {
    if(this.gotToTo)
    {
      callback(this);
    }
  }
  checkGotToFrom(callback : (stepper : Stepper)=>void)
  {
    if(this.gotToFrom)
    {
      callback(this);
    }
  }
}

/*
function Stepper(from,to,step)
{
  this.from = from;
  this.to = to;
  this.step = step;
  this.current = from;
  this.multiplier = 1;
  this.next = function()
  {
    this.current += this.step * this.multiplier;
    if(this.current>this.to)
    {
      this.current = this.to;
      this.multiplier = -1;
    }
    if(this.current<this.from)
    {
      this.current = this.from;
      this.multiplier = 1;
    }
    return this.current; 
  }
}
*/
