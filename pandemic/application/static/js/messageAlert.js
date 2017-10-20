function messageAlert(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.currentStage = 0;
	this.waitTime = 5;
	this.context = options.context;
	this.currentMessage = null;
	
	
	this.newMessage = function(options){
		this.currentStage = 0;
		this.currentMessage = options.message
	}
	
	this.render = function(options){
		this.context.fillStyle = "rgba(0,0,0,.6)";
		
		this.context.font = "22px Sans-serif"
		this.context.strokeStyle = 'black';//'green';
		this.context.lineWidth = 8;
		this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
		this.context.miterLimit=3;

		this.context.strokeText("Infections",this.xPos,startPosition+30);
		this.context.fillStyle = 'white';//this.colour;

		this.context.fillText("Infections",this.xPos,startPosition+30);
		
	}
	
	
}