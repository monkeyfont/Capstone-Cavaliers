var blueInfection = new Image(); blueInfection.src = 'static/images/InfectionStatusBlue.png';
var blackInfection = new Image(); blackInfection.src = 'static/images/InfectionStatusBlack.png';
var redInfection = new Image(); redInfection.src = 'static/images/InfectionStatusRed.png';
var yellowInfection = new Image(); yellowInfection.src = 'static/images/InfectionStatusYellow.png';

function city(options){
	this.id = options.id;
	this.colour = options.colour;
	this.xPos = options.xPos;
	this.yPos = options.yPos; 
	this.radius = options.radius || 12;
	this.researchStation = options.researchStation || false;
	this.infectionStatus = options.infectionStatus || {black:[],blue:[],yellow:[],red:[]};
	this.connections = options.connections || [];
	this.validMove = false;
	
	// this.renderCheck = function(){
		// console.log("___________infection status",this.infectionStatus)
		// for (var i in this.infectionStatus){
			// console.log("i",i);
			// console.log("infection status i",this.infectionStatus[i])
			// for (var x in this.infectionStatus[i]){
				// this.infectionStatus[i][x].render()
				// console.log("x",this.infectionStatus[i][x])
			// }
		// }
	// }
	
	this.infect = function(options){
		console.log("infecting",this.id);
		infectionColour = options.colour || this.colour;
		if (infectionColour == 'blue'){
			infectionImage = blueInfection;
		}else if (infectionColour == 'black'){
			infectionImage = blackInfection;
		}else if (infectionColour == 'red'){
			infectionImage = redInfection;
		}else if (infectionColour == 'yellow'){
			infectionImage = yellowInfection;
		}else (
		console.log("____________UNKNOWN INFECTION COLOUR____________________")
		)	
		// console.log("__________________________________",this.infectionStatus[infectionColour].length)
		// console.log(infectionColour)
		// console.log("length",this.infectionStatus[infectionColour].length)
		// create a new infection with the city, it belongs to, x and y coresponding to the city its created in, and movex,movey that the infection belongs to
		this.infectionStatus[infectionColour].push(new infection({
			id:this.id+" "+ infectionColour+" "+this.infectionStatus[infectionColour].length,
			context: canvas.getContext("2d"),
			width: 80,
			height: 80,
			xPos:this.xPos,
			yPos:this.yPos,
			xScale:0.5,
			yScale:0.5,
			image: infectionImage			
			// options.colour || this.colour
		}));
		
	}
	this.disInfect = function(options){
		//TODO
	}
	
	
	
	
	this.render = function(){
		canvas.getContext("2d").beginPath();
		canvas.getContext("2d").arc(this.xPos, this.yPos, this.radius, 0,Math.PI*2);
		canvas.getContext("2d").fillStyle = this.colour;
		canvas.getContext("2d").fill();
		canvas.getContext("2d").font="16px Verdana";
		canvas.getContext("2d").fillStyle = this.colour;
		textWidth = canvas.getContext("2d").measureText(this.id).width;
		canvas.getContext("2d").fillText(this.id,this.xPos-(textWidth/2),this.yPos-18);
		// for rendering city connections check the distance, and if more than  500, then x is off the board, and y is halfway
		
		for (var i in this.infectionStatus){
			// console.log("i",i);
			// console.log("infection status i",this.infectionStatus.i)
			for (var x in this.infectionStatus[i]){
				this.infectionStatus[i][x].render()
				// console.log("x",this.infectionStatus[i][x])
			}
		}
		
	}
	
}