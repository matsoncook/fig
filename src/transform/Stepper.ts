

export default class Stepper
 { 

   current = 0;
   multiplier = 1;
   constructor(private from : number,private to : number,private step: number)
   {
     this.current = from;
   }
   next()
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