function infectionRate(options) {
	this.id = options.id,			
	this.context = options.context || canvas.getContext("2d");
	this.width = options.width;
	this.height = options.height;
	this.yPos = options.yPos || 100;
	this.xPos = options.xPos || 1200;
	this.radius = options.radius || 25;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.infectionStage = 0;
	this.rateArray = [2,2,2,3,3,4,4]
	
	this.advanceStage = function(){
		this.infectionStage++;
	}

	this.render = function () {
       for (i =0;i<this.rateArray.length;i++){
		this.context.beginPath();
		this.context.arc(this.xPos+(this.radius*2*i), this.yPos, this.radius, 0,Math.PI*2);
		this.context.fillStyle = 'green';
		if (i == this.infectionStage){
			this.context.fillStyle = 'orange';
		}
		this.context.fill();
		canvas.getContext("2d").font="60px Verdana";
		canvas.getContext("2d").fillStyle = 'black';
		textWidth = canvas.getContext("2d").measureText(i).width;
		canvas.getContext("2d").fillText(this.rateArray[i],this.xPos+(this.radius*2*i)-(textWidth/2),this.yPos+(this.radius));
	   }
	canvas.getContext("2d").font="60px Verdana";
	canvas.getContext("2d").fillStyle = 'green';
	canvas.getContext("2d").fillText("Infection Rate",this.xPos,this.yPos+(this.radius*2));
	   
	   
    };
}	