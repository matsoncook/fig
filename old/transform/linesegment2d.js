//https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect

function LineSegment() {
	this.p0 = createPoint2d();
	this.p1 = createPoint2d();
}
function createLineSegmentIntersecter(p0x,p0y,p1x,p1y,pp0x,pp0y,pp1x,pp1y)
{
	var l = new LineSegmentIntersecter();
	l.p0 = createPoint2d(p0x,p0y);
	l.p1 = createPoint2d(p1x,p1y);
	l.pp0 = createPoint2d(pp0x,pp0y);
	l.pp1 = createPoint2d(pp1x,pp1y);
	return l;
}
function createLineSegmentIntersecter(p0,p1,pp0,pp1)
{
	var l = new LineSegmentIntersecter();
	l.p0 = p0;
	l.p1 = p1;
	l.pp0 = pp0;
	l.pp1 = pp1;
	return l;
}
function LineSegmentIntersecter() {
	this.p0;
	this.p1;
	this.pp0;
	this.pp1;
	this.t;
	this.u;
	this.does_intersect = false;
	this.colinear = false;
	this.parellelOrColinear = false;
	
	this.r = new Point2d();
	this.s = new Point2d();
	this.qmp = new Point2d();
	this.intersectionPoint = new Point2d();
	this.log = function()
	{
		var ret = ""+this.p0.log()+","+this.p1.log()+","+this.pp0.log()+","+this.pp1.log()+"";
		return ret;
	}
	this.intersects = function()
	{
		this.does_intersect = false;
		this.colinear = false;
		this.parellelOrColinear = false;
		this.t = 0;
		this.u = 0;

		/*point2d*/
		var p = this.p0;
		/*vector2d*/
		var r = this.r.set1(this.p1).subtract(this.p0);

		/*point2d*/
		var q = this.pp0;
		/*point2d*/
		var pp1 = this.pp1;
		/*vector2d*/
		var s = this.s.set1(pp1).subtract(q);

		/*vector2d*/
		var qmp = this.qmp.set1(q).subtract(p);

		/*double*/
		var rxs = r.cross(s);
		/*double*/
		var qmpxr = qmp.cross(r);

		if (rxs != 0) {
			//Will intersect
			//double
			var qmpxs = qmp.cross(s);
			//double
			var t = qmpxs / rxs;
			//double
			var u = qmpxr / rxs;

			if ((t >= 0 && t <= 1.0) && (u >= 0 && u <= 1.0))
            {						
				this.does_intersect = true;
			}

			this.t = t;
			this.u = u;	
			this.intersectionPoint.set1(this.p0).scale(this.t);


		} else {
			this.parellelOrColinear = true;
			
			//Parallel or collinear
			if (qmpxr != 0) {
				this.parellel = true;
				//parallel but not collinear
			} else {
				//double
				var rdr = r.dot(r);
				//double
				var qmpdr = qmp.dot(r);
				if (qmpdr >= 0 && qmpdr <= rdr) {
					//collinear and overlapping
					this.does_intersect = true;
					this.colinear = true;
				} else {
					//vector2d 
					var pmq = p - q;

					//double 
					var sds = s.dot(s);
					//double 
					var pmqds = pmq.dot(s);
					if (pmqds >= 0 && pmqds <= sds) {
						//collinear and overlapping
						this.does_intersect = true;
						this.colinear = true;
					}
				}
			}
		}

		return this.does_intersect;
	}
	
	


}

function LineSegmentBisector()
{
	this.p0;
	this.p1;
	this.p2;

	this.width;
	
	
	this.pf0w = new Point2d();
	this.pf1w = new Point2d();
	this.pt0w = new Point2d();
	this.pt1w = new Point2d();
	
	this.intersectPoint = new Point2d();
	this.intersectVector = new Point2d();
	
	
	this.intersector = new LineSegmentIntersecter();
	
	this.setPoints = function(p0,p1,p2)
	{
		this.p0 = p0;
		this.p1 = p1;
		this.p2 = p2;
	}
	
	this.setWidth = function(width)
	{
		this.width = width;
		
		this.p0.perp4len(p1,0,pf0w,0,width);
		this.p0.perp4len(p1,0,pf1w,1,width);
		
		this.p1.perp4len(p2,0,pt0w,0,width);
		this.p1.perp4len(p2,0,pt1w,1,width);
	}
	
	
	this.intersect = function()
	{
		
		this.p0;
		this.p1;
		this.pp0;
		this.pp1;
		this.intersector.p0 = this.pf0w;
		this.intersector.p1 = this.pf1w;
		this.intersector.pp0 = this.pt0w;
		this.intersector.pp1 = this.pt1w;
		
		this.intersector.intersects();
		if(this.intersector.parellelOrColinear )
		{
			
			
		}
	}
	
}

var testLineSegmentIntersecter = function()
{
	var l  = new LineSegmentIntersecter();
	l.p0 = createPoint2d(0,0);
	l.p1 = createPoint2d(1,1);
	l.pp0 = createPoint2d(0,1);
	l.pp1 = createPoint2d(1,0);
	
	var does = l.intersects();
	return does;
}
LineSegment.prototype = {
	intersect : function(p_line) {
		var does_intersect = false;
		/*point2d*/
		var p = p0;
		/*vector2d*/
		var r = clonePoint2d(p1).subtract(p0);

		/*point2d*/
		var q = p_line.p0;
		/*point2d*/
		var pp1 = p_line.p1;
		/*vector2d*/
		var s = pp1 - q;

		/*vector2d*/
		var qmp = clonePoint2d(q).subtract(p);

		/*double*/
		var rxs = r.cross(s);
		/*double*/
		var qmpxr = qmp.cross(r);

		if (rxs != 0) {
			//Will intersect
			//double
			var qmpxs = qmp.cross(s);
			//double
			var t = qmpxs / rxs;
			//double
			var u = qmpxr / rxs;

			if ((t >= 0 && t <= 1.0) && (u >= 0 && u <= 1.0)) {
				does_intersect = true;
			}

		} else {
			//Parallel or collinear
			if (qmpxr != 0) {
				//parallel but not collinear
			} else {
				//double
				var rdr = r.dot(r);
				//double
				var qmpdr = qmp.dot(r);
				if (qmpdr >= 0 && qmpdr <= rdr) {
					//collinear and overlapping
					does_intersect = true;
				} else {
					//vector2d 
					var pmq = p - q;

					//double 
					var sds = s.dot(s);
					//double 
					var pmqds = pmq.dot(s);
					if (pmqds >= 0 && pmqds <= sds) {
						//collinear and overlapping
						does_intersect = true;
					}
				}
			}
		}

		return does_intersect;
	}

}
