var blueInfection = new Image(); blueInfection.src = 'static/images/Infections/blueInfection.png';
var blackInfection = new Image(); blackInfection.src = 'static/images/Infections/blackInfection.png';
var redInfection = new Image(); redInfection.src = 'static/images/Infections/redInfection.png';
var yellowInfection = new Image(); yellowInfection.src = 'static/images/Infections/yellowInfection.png';

infections = {blueInfection,blackInfection,redInfection,yellowInfection};

function infectionMeter(options){
	this.context = options.context;
	this.infectionScale = 0.2;
	this.xPos = options.xPos; 
	this.yPos = options.yPos;
	this.infectionWidth = 256;
	this.infectionHeight = 256;
	this.infectionBarStatus = {red:{amount:40},yellow:{amount:40},black:{amount:40},blue:{amount:40}}
	
	this.alterInfectionStatus = function(options){
		//{colour,amount}
		//alert(options.colour+" "+ options.amount)
		this.infectionBarStatus[options.colour].amount = options.amount;
	}
				

	this.render = function(){
		for (i in this.infectionBarStatus){
			position = Object.keys(this.infectionBarStatus).indexOf(i)
			rightShift = (position)*this.infectionWidth*this.infectionScale+(12*position)
			this.context.drawImage(
			infections[i+"Infection"], //image to use
			0, // x position to start clipping 
			0, // y position to start clipping
			this.infectionWidth, //width of clipped image
			this.infectionHeight, // height of clipped image
			this.xPos+rightShift, //x position for image on canvas
			this.yPos, // y position for image on canvas
			this.infectionWidth*this.infectionScale, // width of image to use 
			this.infectionHeight*this.infectionScale);
			this.context.font = "bold 22px Verdana"
			this.context.fillStyle = i;//'green';
			this.context.fillText(this.infectionBarStatus[i].amount,this.xPos+rightShift,this.yPos);
			// console.log("amount",this.infectionBarStatus[i].amount)
			
		}
	}
}