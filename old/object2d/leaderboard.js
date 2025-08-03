function createLeaderBoardGroup(groupToRate,getPoints,compareFunction)
{
	var leaderBoard = new GameObject(0,"LeaderboardGroup");
	
	leaderBoard.constructIt = function()
	{
		this.getPoints = getPoints;	
		this.size = 4;
		this.textPosY = -0.5;
		this.textSizeY = 0.05;
		this.fillStyle =  "white";
		this.strokeStyle = "purple";
		this.groupToRate = groupToRate;
		
		this.heading = createTextObject2d("Leaders")
		                  .setFillStyle(this.fillStyle)
		                  .setStrokeStyle(this.strokeStyle)
		                  .setHorizontalJustification(HorizontalJustification.Left)
		                  .setVerticalJustification(VerticalJustification.Bottom)
		                  .setViewPort(this.viewPort);
		this.heading.name = "LeaderHeader";
		this.heading.position.set2(-.5,.5);
		this.heading.size.set2(1,0.2);
		
		this.addChildObject(this.heading);
		
		this.ratingsGroup = new GameObject(0,"RatingsGroup");
		this.addChildObject(this.ratingsGroup);
		
		
		this.ratings = [];
		
		this.updateIntervalMs = 250;
		
		if(compareFunction == undefined || compareFunction == null)
		{
			//Order descending
			this.compareFunction = function(a,b) {
				  if (a.points < b.points)
					    return 1;
					  if (a.points > b.points)
					    return -1;
					  return 0;
					};
		}
		else
		{
			this.compareFunction = compareFunction;	
		}
		
		var yPos = 0.5;
		for(var i = 0; i < this.size; i++)
		{
			var lbo = createTextObject2d("---------"+i)
			    .setName("LeaderText"+i)
			    .setHorizontalJustification(HorizontalJustification.Left)
			    .setVerticalJustification(VerticalJustification.Bottom)		
			    .setFillStyle(this.fillStyle)
			    .setStrokeStyle(this.strokeStyle)
			    .setViewPort(this.viewPort);
			
			yPos -= 0.2;
			lbo.position.set2(-.5,yPos);
			lbo.size.set2(1,0.2);
			
			//ratings.push({lbo:lbo});
			this.ratingsGroup.addChildObject(lbo);
		}
		
		this.rateGroup = function()
		{
			this.ratings = [];
			for(var i = 0; i<this.groupToRate.childObjectList.length;++i)
			{
				var rating = { avatarName: this.groupToRate.childObjectList[i].avatarName,
						points:this.getPoints(this.groupToRate.childObjectList[i])};
				this.ratings.push(rating);
			}
			this.ratings.sort(this.compareFunction);
			for(var i = 0; i<this.ratingsGroup.childObjectList.length;i++)
			{
			    if(i<this.ratings.length)
				{
					this.ratingsGroup.childObjectList[i].text = "" + this.ratings[i].points + " - " +this.ratings[i].avatarName;
				}
				else
				{
					this.ratingsGroup.childObjectList[i].text = "";
				}
			}
			
		}
		this.previousTime1 = 0;
		this.beforeAdvance = function(time)
		{
			if((time - this.previousTime1) >this.updateIntervalMs )
			{
				this.previousTime1 = time;
				this.rateGroup();
			}
			
		}
		/*this.getPoints = function(gameObject)
		{
			return 0;
		}*/
		
	}

	
	
	
	return leaderBoard;
		
	}