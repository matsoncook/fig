function createPoint2d(x,y)
{
	var p = new Point2d();
	p.x = x;
	p.y = y;
	return p;
}
function clonePoint2d(p1)
{
	var p = new Point2d();
	p.x = p1.x;
	p.y = p1.y;
	return p;
}
function Point2d()
{
	this.x = 0;
	this.y = 0;
}

Point2d.prototype = {
	add : function(point)
	{
		this.x += point.x;
		this.y += point.y;
		return this;
	},
	add1 : function(px)
	{
		this.x += px;
		this.y += px;
		return this;
	},
	add2 : function(px,py)
	{
		this.x += px;
		this.y += py;
		return this;
	},
	set : function(px,py)
	{
		this.x = px;
		this.y = py;
		return this;
	},
	set1 : function(point2d)
	{
		this.x = point2d.x;
		this.y = point2d.y;
		return this;
	},
	set2 : function(px,py)
	{
		this.x = px;
		this.y = py;
		return this;
	},
	subtract : function(point)
	{
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},
	equals : function(point)
	{
		if(this.x == point.x && this.y == point.y)
		{
			return true;
		}
		return false;
		
	},
	equalsNear : function(point,near)
	{
		if(Math.abs(this.x - point.x) < near && Math.abs(this.y - point.y) < near)
		{
			return true;
		}
		return false;
		
	},
	scale : function(scale)
	{
		this.x *= scale;
		this.y *= scale;
		 return this;
	},
	dot : function(p)
	{
		 return (this.x * p.x) + (this.y * p.y);
	},
	cross : function(vector)
	{
		return (this.x*vector.y) - (this.y*vector.x);
	},
	log : function(){
		return "" + this.x + "," + this.y;
	},
    normalize : function(){
    	var x = this.x;
    	var y = this.y;
        var len=Math.sqrt((x*x)+(y*y));
        if(len==0){x=0;y=0;}else{
        	this.x=x/len;this.y=y/len;}
        return this;
    },
    advancePoint : function(p1,scale,pTo)
	{
		pTo.set1(p1);
		pTo.subtract(this);
		pTo.scale(scale);
		pTo.add(this);
	},
    perp : function(p1,pTo)
    {
    	var diffX = p1.x - this.x;
    	var diffY = p1.y - this.y;
    	pTo.set1(this);
    	pTo.add2(-diffY,diffX); 
    },
	perp3 : function(p1,pTo,scale)
    {
    	var diffX = (p1.x - this.x) * scale;
    	var diffY = (p1.y - this.y) * scale;
    	pTo.set1(this);
    	pTo.add2(-diffY,diffX); 
    },
    //move along vector by scaleV then perp by scaleP
    perp4 : function(p1,pTo,scaleV,scaleP)
	{
    	var diffX = p1.x - this.x;
    	var diffY = p1.y - this.y;
    	pTo.set1(this);
    	pTo.add2(diffX*scaleV,diffY*scaleV); 
    	pTo.add2(-diffY*scaleP,diffX*scaleP); 
	},
    perp4len : function(p1,pTo,scaleV,lenP)
	{
    	var diffX = p1.x - this.x;
    	var diffY = p1.y - this.y;
    	pTo.set1(this);
    	pTo.add2(diffX*scaleV,diffY*scaleV);
    	
    	var lenDiff2 = Math.sqrt((diffX * diffX) + (diffY * diffY));
    	//var len2 = lenP * lenP;
    	var scaleP = lenP/lenDiff2;
    	//if(lenP<0)
    	//{
    		//scaleP = scaleP * -1;
    	//}
    		
    	
    	pTo.add2(-diffY*scaleP,diffX*scaleP); 
	},
	
	//bisects p1 - p1-p0, p1-p2
	bisect6(p1,p2,len,result,temp1,temp2)
	{
		var p0 = this;
		var v0 = temp1;
		v0.set1(p0);
		v0.subtract(p1);
		
		var v1 = temp2;
		v1.set1(p2);
		v1.subtract(p1);
		
		result.set1(v0);
		result.add(v1);
		result.scale(.5);
		result.normalize();
		result.scale(len);
		result.add(p1);
	},
	dist2()
	{
		return (this.x * this.x) + (this.y * this.y);
	},
	magnitude()
	{
		return Math.sqrt(this.dist2());
	}
	
}