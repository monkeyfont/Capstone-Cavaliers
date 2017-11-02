function endScreen(options){
	this.active = false;
	this.currentStage = 1;
	this.fadeTime = 2*60;
	this.context = options.context;
	this.endMessage = "win";
	this.width = options.width;
	this.height = options.height;
	// this.showMessage = false;
	
	
	this.activateEndGame = function(options){
		//options = {gameStatus:"Won"||"Lost"}
		this.endMessage = "You've "+options.gameStatus
		this.active = true;
	}
	
	this.render = function(options){
		if (this.active){
			this.currentStage = this.currentStage + 1;
			// console.log(this.fadeTime,this.currentStage)
			if (this.currentStage<this.fadeTime){
				fade = (1/this.fadeTime*this.currentStage)
			}else{
				fade = 1;
			}
			
			// console.log(fade)
			this.context.fillStyle = "rgba(0,0,0,"+fade+")";
			this.context.fillRect(0,0,this.width,this.height)
			
			
			
			
			
			this.context.font = "80px Sans-serif"
			this.context.strokeStyle = "rgb(0,0,0)";//'green';
			this.context.lineWidth = 6;
			this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
			this.context.miterLimit=3;
			textWidth = this.context.measureText(this.endMessage).width;
			this.context.strokeText(this.endMessage,(this.width/2)-(textWidth/2),this.height/2);
			this.context.fillStyle = "rgb(255,255,255)";//this.colour;

			this.context.fillText(this.endMessage,(this.width/2)-(textWidth/2),this.height/2);

			
			
			
			
			
			
		}
	}
	
	
}