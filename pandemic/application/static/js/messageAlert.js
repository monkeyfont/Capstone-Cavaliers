function messageAlert(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.currentStage = 0;
	this.waitTime = 4*60;
	this.fadeTime = 2*60;
	this.context = options.context;
	this.currentMessage = null;
	this.showMessage = false;
	
	
	this.newMessage = function(options){
		console.log("new message is: ",options.message)
		this.currentStage = 0;
		this.showMessage = true;
		this.currentMessage = options.message
	}
	
	this.render = function(options){
		if (this.showMessage){
			this.currentStage = this.currentStage + 1;
			
			if (this.currentStage < this.waitTime){
				fade = 1
			}else if ( this.currentStage < this.waitTime+this.fadeTime){
				fade = ((this.waitTime+this.fadeTime)-this.currentStage)/this.fadeTime
				console.log("fade is",fade)
			}else{				
				fade = 0
				this.showMessage = false;
			}
			this.context.fillStyle = "rgba(0,0,0,"+fade+")";
			
			this.context.font = "120px Sans-serif"
			this.context.strokeStyle = "rgba(0,0,0,"+fade+")";//'green';
			this.context.lineWidth = 20;
			this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
			this.context.miterLimit=3;

			this.context.strokeText(this.currentMessage,this.xPos,this.yPos);
			this.context.fillStyle = "rgba(255,255,255,"+fade+")";//this.colour;

			this.context.fillText(this.currentMessage,this.xPos,this.yPos);
		}
	}
	
	
}