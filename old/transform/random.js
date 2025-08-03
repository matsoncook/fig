
function Random(pSeed)
{
	this.seed = pSeed;
	/*this.count=0;
	this.aList=[];
	this.nextDouble1 = function(){
		
		var x = this.aList[this.count];
		this.count++;
		return x;
	}*/
	this.nextDouble = function(){
		var x = Math.sin(this.seed++)*1000;
		return x - Math.floor(x);
	}
	
	this.randomPosition = function(bounds,returnPosition)
	{
		var x = (bounds.x/2) - (this.nextDouble()*bounds.x);
		var y = (bounds.y/2) - (this.nextDouble()*bounds.y);
		returnPosition.set2(x,y);
		returnPosition.scale(0.95);//Regulator
		return returnPosition;
	}
	
	/*
	 function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
	 */

}