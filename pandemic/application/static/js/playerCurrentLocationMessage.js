function playerCityMessage(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.context = options.context;

	this.render = function(){
				this.context.font = "30px Sans-serif"
				this.context.strokeStyle = "rgb(0,0,0)";//'green';
				this.context.lineWidth = 8;
				this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
				this.context.miterLimit=3;
				this.context.strokeText("Your Current City is: "+players.players[thisPlayerName].currentCity,this.xPos,this.yPos);
				this.context.fillStyle = "rgb(255,255,255)";//this.colour;

				this.context.fillText("Your Current City is: "+players.players[thisPlayerName].currentCity,this.xPos,this.yPos);
	}
	
}