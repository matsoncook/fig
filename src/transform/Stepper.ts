

export default class Stepper {

  current = 0;
  multiplier = 1;
  gotToTo = false;
  gotToFrom = false;
  constructor(private from: number, private to: number, private step: number) {
    this.current = from;
  }
  next() {
    this.gotToTo = false;
    this.gotToFrom = false;
    this.current += this.step * this.multiplier;
    if (this.current > this.to) {
      this.current = this.to;
      this.multiplier = -1;
      this.gotToTo = true;
    }
    if (this.current < this.from) {
      this.current = this.from;
      this.multiplier = 1;
      this.gotToFrom = true;
    }
    return this.current;
  }
  pause()
  {
    this.multiplier = 0;
  }
  continue(multiplier = 1)
  {
    this.multiplier = multiplier;
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