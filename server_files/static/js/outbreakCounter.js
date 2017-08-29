function outbreakCounter(options) {
	this.id = options.id,			
	this.context = options.context || canvas.getContext("2d");
	this.width = options.width;
	this.height = options.height;
	this.yPos = options.yPos || 100;
	this.xPos = options.xPos || 100;
	this.radius = options.radius || 25;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.outbreakStage = 0;

	this.advanceStage = function(){
		this.outbreakStage ++;
	}
	
	this.render = function () {
       for (i =0;i<9;i++){
		this.context.beginPath();
		this.context.arc(this.xPos+(this.radius*2*i), this.yPos, this.radius, 0,Math.PI*2);
		this.context.fillStyle = 'green';
		if (i == this.outbreakStage){
			this.context.fillStyle = 'orange';
		}
		this.context.fill();
		canvas.getContext("2d").font="60px Verdana";
		canvas.getContext("2d").fillStyle = 'black';
		textWidth = canvas.getContext("2d").measureText(i).width;
		canvas.getContext("2d").fillText(i,this.xPos+(this.radius*2*i)-(textWidth/2),this.yPos+(this.radius));
	   }
	canvas.getContext("2d").font="60px Verdana";
	canvas.getContext("2d").fillStyle = 'green';
	canvas.getContext("2d").fillText("Outbreak Counter",this.xPos,this.yPos+(this.radius*2));
	   
	   
    };
}	