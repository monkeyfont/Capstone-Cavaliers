function infectionRate(options) {
	this.id = options.id,			
	this.context = options.context || canvas.getContext("2d");
	this.width = options.width;
	this.height = options.height;
	this.yPos = options.yPos || 100;
	this.xPos = options.xPos || 900;
	this.radius = options.radius || 25;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.infectionStage = 0;
	this.rateArray = [2,2,2,3,3,4,4]
	
	this.setStage = function(options){
		this.infectionStage = options.infectionStage;
	}
    var offSetYPos = 0;
	this.render = function () {
       for (i =0;i<this.rateArray.length;i++){
           if(i%2 == 1){offSetYPos = 30;}
           else{offSetYPos = 0;}
                this.context.beginPath();
                this.context.arc(this.xPos+(this.radius*2*(i*0.9)), this.yPos+offSetYPos, this.radius, 0,Math.PI*2);
                this.context.fillStyle = 'green';
                if (i == this.infectionStage){
                    this.context.fillStyle = 'orange';
                }
		this.context.fill();
		canvas.getContext("2d").font="55px Verdana";
		canvas.getContext("2d").fillStyle = 'black';
		textWidth = canvas.getContext("2d").measureText(i).width;
		canvas.getContext("2d").fillText(this.rateArray[i],this.xPos+(this.radius*2*(i*0.9))-(textWidth/2),this.yPos+offSetYPos*0.93+(this.radius));
	   }
	canvas.getContext("2d").font="45px Verdana";
	canvas.getContext("2d").fillStyle = 'green';
	canvas.getContext("2d").fillText("Infection Rate",this.xPos-this.radius,this.yPos-(this.radius*1.5));
	   
	   
    };
}	