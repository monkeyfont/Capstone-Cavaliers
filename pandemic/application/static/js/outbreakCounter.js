function outbreakCounter(options) {
	this.id = options.id,			
	this.context = options.context || canvas.getContext("2d");
	this.width = options.width;
	this.height = options.height;
	this.yPos = options.yPos || 100;
	this.xPos = options.xPos || 50;
	this.radius = options.radius || 25;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.outbreakStage = 0;

	this.setStage = function(options){
		this.outbreakStage = options.outbreakStage;
	}
    var offSetYPos = 0;
	this.render = function () {
        
    for (i =0;i<9;i++){
        if(i%2 != 0){offSetYPos = 30;}
        else{offSetYPos = 0;}
        
        this.context.beginPath();
        this.context.arc(this.xPos+(this.radius*2*(i*0.9)), this.yPos+offSetYPos, this.radius+4, 0,Math.PI*2);
        this.context.fillStyle = 'black';
        this.context.fill();
        
        this.context.beginPath();
        this.context.arc(this.xPos+(this.radius*2*(i*0.9)), this.yPos+offSetYPos, this.radius, 0,Math.PI*2);
        this.context.fillStyle = 'white';

        if (i == this.outbreakStage){
            this.context.fillStyle = '#59C655';
        }   
		this.context.fill();
		canvas.getContext("2d").font="55px Verdana";
		canvas.getContext("2d").fillStyle = 'black';
		textWidth = canvas.getContext("2d").measureText(i).width;
        
		canvas.getContext("2d").fillText(i,this.xPos+(this.radius*2*(i*0.9))-(textWidth/2),this.yPos+offSetYPos*0.85+(this.radius));
	   }
	canvas.getContext("2d").font="45px Verdana";
	canvas.getContext("2d").fillStyle = 'black';
	canvas.getContext("2d").fillText("Outbreak Counter",this.xPos-this.radius,this.yPos-(this.radius*1.5));
	   
	   
    };
}	