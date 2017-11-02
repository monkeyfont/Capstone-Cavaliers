function messageAlert(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.size = options.size || 80;
	this.currentStage = 0;
	this.waitTime = 2*60;
	this.fadeTime = 1*60;
	this.context = options.context;
	this.currentMessage = null;
	this.showMessage = false;
	
	
	this.newMessage = function(options){
		// messageAlert.newMessage({message:"heres a fake message"})
		console.log("new message is: ",options.message)
		this.size = options.size || this.size;
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
			
			this.context.font = this.size + "px Sans-serif"
			this.context.strokeStyle = "rgba(0,0,0,"+fade+")";//'green';
			this.context.lineWidth = this.size/6;
			this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
			this.context.miterLimit=3;
			textWidth = this.context.measureText(this.currentMessage).width;
			this.context.strokeText(this.currentMessage,this.xPos-(textWidth/2),this.yPos);
			this.context.fillStyle = "rgba(255,255,255,"+fade+")";//this.colour;

			this.context.fillText(this.currentMessage,this.xPos-(textWidth/2),this.yPos);
			
			
			// this.context.font = "22px Sans-serif"
		// this.context.strokeStyle = 'black';//'green';
		// this.context.lineWidth = 8;
		// this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
		// this.context.miterLimit=3;
		// textWidth = this.context.measureText(this.id).width;
		// this.context.strokeText(this.id,this.xPos-(textWidth/2),this.yPos-18);
		// this.context.fillStyle = 'white';//this.colour;
		// textWidth = this.context.measureText(this.id).width;
		// this.context.fillText(this.id,this.xPos-(textWidth/2),this.yPos-18);
			
			
			
			
			
			
		}
	}
	
	
}