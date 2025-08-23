import { Point2d } from "./Point2d";

export default class LineSegmentIntersecter
{
 
	p0 = new Point2d();
	p1 = new Point2d();
	pp0 = new Point2d();
	pp1 = new Point2d();
	t = 0;
	u = 0;
	does_intersect = false;
	colinear = false;
	parellelOrColinear = false;
	
	r = new Point2d();
	s = new Point2d();
	qmp = new Point2d();
	intersectionPoint = new Point2d();

    parellel = false;
	log()
	{
		var ret = ""+this.p0.log()+","+this.p1.log()+","+this.pp0.log()+","+this.pp1.log()+"";
		return ret;
	}
	intersects()
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
					var pmq = p.clone();
                    pmq.subtract(q);
                   

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
