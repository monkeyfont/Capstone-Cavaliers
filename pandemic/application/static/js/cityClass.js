var blueInfection = new Image(); blueInfection.src = 'static/images/Infections/blueInfection.png';
var blackInfection = new Image(); blackInfection.src = 'static/images/Infections/blackInfection.png';
var redInfection = new Image(); redInfection.src = 'static/images/Infections/redInfection.png';
var yellowInfection = new Image(); yellowInfection.src = 'static/images/Infections/yellowInfection.png';

function city(options){
	this.id = options.id;
	this.locationPointerX = options.locationPointerX || options.xPos;
	this.locationPointerY = options.locationPointerY || options.yPos;
	this.colour = options.colour;
	this.xPos = options.xPos;
	this.yPos = options.yPos; 
	this.context = options.context || canvas.getContext("2d") ;
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
	this.activeInfections = function(){
		currentActive = {};
		for (i in this.infectionStatus){
			if (this.infectionStatus[i].length > 0){
				currentActive[i] = this.infectionStatus[i].length;
			}
		}
		console.log("current active",currentActive);
		return currentActive 
	}
	
	
	this.infect = function(options){
		// {colour:"yellow"||"red"||"black"||"blue",infectionPath:[{x:200,y:200},{x:300,y:300}]}
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
		if (typeof options.infectionPath == 'undefined'){
			infectionX = this.xPos
			infectionY = this.yPos
		}else{
			infectionX = options.infectionPath[options.infectionPath.length-1].x
			infectionY = options.infectionPath[options.infectionPath.length-1].y
		}
		
		
		this.infectionStatus[infectionColour].push(new infection({
			id:this.id+" "+ infectionColour+" "+this.infectionStatus[infectionColour].length,
			colour: options.colour || this.colour,
			context: this.context,
			width: 256,
			height: 256,
			xPos:infectionX,
			yPos:infectionY,
			xScale:0.15,
			yScale:0.15,
			image: infectionImage,
			infectionPath:options.infectionPath || []
			// options.colour || this.colour
		}));
		
	}
	this.disinfect = function(options){
		// options = {colour:, ammount:}
		infectionColour = options.colour || this.colour ;
		disinfections = options.amount || 1;
		for(i = 0; i < disinfections; i++){
			console.log("removed infection")
			this.infectionStatus[infectionColour].pop()
		}
	}
	
	this.drawStroked = function(text, x, y) {
		
	}
	
	
	this.render = function(){
		canvas.getContext("2d").beginPath();
		canvas.getContext("2d").arc(this.xPos, this.yPos, this.radius, 0,Math.PI*2);
		canvas.getContext("2d").fillStyle = this.colour;
		canvas.getContext("2d").fill();
		canvas.getContext("2d").arc(this.locationPointerX, this.locationPointerY, this.radius/3, 0,Math.PI*2);
		canvas.getContext("2d").fillStyle = this.colour;
		canvas.getContext("2d").fill();
		context.beginPath();
		context.moveTo(this.xPos, this.yPos);
		context.lineTo(this.locationPointerX, this.locationPointerY);
		context.lineWidth = 1;
				// set line color
		context.strokeStyle = this.colour;
		context.stroke();
		
		
		canvas.getContext("2d").font = "30px Sans-serif"
		canvas.getContext("2d").strokeStyle = 'black';//'green';
		canvas.getContext("2d").lineWidth = 8;
		canvas.getContext("2d").lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
		canvas.getContext("2d").miterLimit=3;
		textWidth = canvas.getContext("2d").measureText(this.id).width;
		canvas.getContext("2d").strokeText(this.id,this.xPos-(textWidth/2),this.yPos-18);
		canvas.getContext("2d").fillStyle = 'white';//this.colour;
		textWidth = canvas.getContext("2d").measureText(this.id).width;
		canvas.getContext("2d").fillText(this.id,this.xPos-(textWidth/2),this.yPos-18);
		
		// canvas.getContext("2d").font="16px Verdana";
		// canvas.getContext("2d").fillStyle = 'white';//this.colour;
		// textWidth = canvas.getContext("2d").measureText(this.id).width;
		// canvas.getContext("2d").fillText(this.id,this.xPos-(textWidth/2),this.yPos-18);
		// for rendering city connections check the distance, and if more than  500, then x is off the board, and y is halfway
		
		for (var i in this.infectionStatus){
			
			// console.log("i",i);
			// console.log("infection status i",this.infectionStatus.i)
			// console.log("infection status_______________________",this.infectionStatus[i])
			for (var x in this.infectionStatus[i]){
				this.infectionStatus[i][x].render()
				// console.log("x",this.infectionStatus[i][x])
			}
			if (this.infectionStatus[i].length >0){
				infectionSymbol = this.infectionStatus[i][0]
				canvas.getContext("2d").font="30px Verdana";
				canvas.getContext("2d").fillStyle = this.infectionStatus[i][0].colour;
				canvas.getContext("2d").fillText(this.infectionStatus[i].length,infectionSymbol.xPos+(infectionSymbol.width*infectionSymbol.xScale),infectionSymbol.yPos);
				// console.log("length = ",this.infectionStatus[i].length)
				// console.log("x = ",infectionSymbol.xPos)
				// console.log("y =", infectionSymbol.yPos)
			}
		}
		
	}
	
}