var emptyCure = new Image(); emptyCure.src = 'static/images/Cures/emptyCure.png';
var blackCure = new Image(); blackCure.src = 'static/images/Cures/blackCure.png';
var blackEradicate = new Image(); blackEradicate.src = 'static/images/Cures/blackEradicate.png';
var blueCure = new Image(); blueCure.src = 'static/images/Cures/blueCure.png';
var blueEradicate = new Image(); blueEradicate.src = 'static/images/Cures/blueEradicate.png';
var redCure = new Image(); redCure.src = 'static/images/Cures/redCure.png';
var redEradicate = new Image(); redEradicate.src = 'static/images/Cures/redEradicate.png';
var yellowCure = new Image(); yellowCure.src = 'static/images/Cures/yellowCure.png';
var yellowEradicate = new Image(); yellowEradicate.src = 'static/images/Cures/yellowEradicate.png';

function cureIndicator(options) {
	this.yPos = options.yPos || 100;
	this.xPos = options.xPos || 1200;
	this.cureStatuses = {blackStatus:'emptyCure',blueStatus:'emptyCure',redStatus:'emptyCure',yellowStatus:'emptyCure'}
	
	this.changeCureStatus = function({options}){
		//options{colour:black||blue||red||yellow,status:empty||cure||eradicate}
		this.cureStatuses[options.colour]:options.status;
	}

	this.render = function () {
       for (i =0;i<this.rateArray.length;i++){
		this.context.beginPath();
		this.context.arc(this.xPos+(this.radius*2*i), this.yPos, this.radius, 0,Math.PI*2);
		this.context.fillStyle = 'green';
		if (i == this.infectionStage){
			this.context.fillStyle = 'orange';
		}
		this.context.fill();
		canvas.getContext("2d").font="60px Verdana";
		canvas.getContext("2d").fillStyle = 'black';
		textWidth = canvas.getContext("2d").measureText(i).width;
		canvas.getContext("2d").fillText(this.rateArray[i],this.xPos+(this.radius*2*i)-(textWidth/2),this.yPos+(this.radius));
	   }
	canvas.getContext("2d").font="60px Verdana";
	canvas.getContext("2d").fillStyle = 'green';
	canvas.getContext("2d").fillText("Infection Rate",this.xPos,this.yPos+(this.radius*2));
	   
	   
    };
}	