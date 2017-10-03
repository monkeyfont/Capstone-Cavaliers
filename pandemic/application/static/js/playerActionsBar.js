function playerActionsBar(options){
	this.context = options.context;
	this.height = options.height;
	this.width = options.width;	
	this.yPos = options.yPos;
	
	
	
	this.render = function(){
		context.beginPath();
		context.moveTo(0, this.yPos);
		context.lineTo(this.width-200,this.yPos);
		context.quadraticCurveTo(this.width,this.yPos,this.width,this.yPos+200);
		context.lineTo(this.width,this.yPos+this.height);
		context.lineTo(0,this.yPos+this.height);
		context.closePath();
		context.lineWidth=5;
		context.fillStyle = 'blue';
		context.fill();
		context.strokeStyle = 'blue';
		context.stroke();
	}
}