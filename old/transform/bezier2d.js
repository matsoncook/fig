//var Point2d = require('../transform/point2d.js');
//var createPoint2d = Point2d.createPoint2d;


function createBezierCurve2d8(p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y)
{
	var bc = new BezierCurve2d();
	
	bc.p0.x = p0x;
	bc.p0.y = p0y;
	
	bc.p1.x = p1x;
	bc.p1.y = p1y;
	
	bc.p2.x = p2x;
	bc.p2.y = p2y;
	
	bc.p3.x = p3x;
	bc.p3.y = p3y;
	
	return bc;
}

function BezierCurve2d()
{

	this.p0 = new Point2d();
	this.p1 = new Point2d();
	this.p2 = new Point2d();
	this.p3 = new Point2d();
	this.pomax = null;
	
	this.shift = function(x,y)
	{
		
	}
	this.pointAt = function(t)
	{
		var ret = this.pomax.get(t);
		return createPoint2d(ret.x,ret.y);
	}
	this.normal = function(t)
	{
		var ret = this.pomax.normal(t);
		return createPoint2d(ret.x,ret.y);
	}
	
	this.set1 = function(bezierObject)
	{
		this.p0.set1(bezierObject.p0);
		this.p1.set1(bezierObject.p1);
		this.p2.set1(bezierObject.p2);
		this.p3.set1(bezierObject.p3);
	}
	
	this.compile = function()
	{
		var path = [this.p0,this.p1,this.p2,this.p3];
		this.pomax = new Bezier(path);
		/*var draw = function() {
		  drawSkeleton(curve);
		  drawCurve(curve);
		  setColor("red");
		  var pt, nv, d=20;
		  for(var t=0; t<=1; t+=0.1) {
		    var pt = curve.get(t);
		    var nv = curve.normal(t);
		    drawLine(pt, { x: pt.x + d*nv.x, y: pt.y + d*nv.y} );
		  }
		}*/
		
	}

}

function PolyBezierCurve2d()
{
	this.curveList = [];
	this.appendCurve = function(curve)
	{
		this.curveList.push(curve);
	}
	
	this.append1 = function(point)
	{
		var previousCurve = this.curveList[this.curveList.length-1];
		var newCurve = new BezierCurve2d();
		newCurve.p0 = previousCurve.p3;
		this.curveList.push(newCurve);
		newCurve.p3 = point;
		
		var cpDiff = previousCurve.p3.subtract(previousCurve.p2)
		
		newCurve.p1 = previousCurve.p3.add(cpDiff);
		
		newCurve.p2 = newCurve.p3.subtract(cpDiff);
		
		
	}
	this.append1Transpose = function(point)
	{
		
	}

	
	this.append2 = function(pointList2)
	{
		
	}
	
	this.append3 = function(pointList3)
	{
		var previousCurve = this.curveList[this.curveList.length-1];
		var newCurve = new BezierCurve2d();
		this.curveList.push(newCurve);
		
		newCurve.p0 = previousCurve.p3;
		
		newCurve.p1 = pointList3[0];
		newCurve.p2 = pointList3[1];
		newCurve.p3 = pointList3[2];
		
		
	}
	
	this.set1 = function(bezierCurve)
	{
		this.curveList = [];
		for(var i = 0; i < bezierCurve.curveList.length; i++)
		{
			var bc = new BezierCurve2d();
			bc.set1(bezierCurve.curveList[i]);
			this.curveList.push(bc);
		}
		
	}
	
	this.compile = function()
	{
		for(var i = 0; i < this.curveList.length; i++)
		{
			this.curveList[i].compile();
		}
	}
	
}
//module.exports = BezierCurve2d;
//module.exports.createBezierCurve2d8 = createBezierCurve2d8;