var playerViewImage = new Image();
playerViewImage.src = 'static/images/Medic.png';	



function portraitInitilization(options){
	this.playerPortraits = []
	this.addPlayerPortrait = function(options){
		this.playerPortraits.push(new portrait({
			id:"playerViewImage",
			xPos:1920,
			yPos:20,
			xScale:1,
			yScale:1,
			height:172,
			width:198,
			image:playerViewImage,
			context: canvas.getContext("2d")
		}));
	}
	
	this.render = function(){
		for( i in this.playerPortraits){
			this.playerPortraits[i].render();
		}
		
	}
	
	
	
	
	
	
	
	
	
	
}