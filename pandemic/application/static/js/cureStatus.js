var undiscovered = new Image(); undiscovered.src = 'static/images/Cures/emptyCure.png';
var redDiscovered = new Image(); redDiscovered.src = 'static/images/Cures/redCure.png';
var redEradicated = new Image(); redEradicated.src = 'static/images/Cures/redEradicate.png';
var blueDiscovered = new Image(); blueDiscovered.src = 'static/images/Cures/blueCure.png';
var blueEradicated = new Image(); blueEradicated.src = 'static/images/Cures/blueEradicate.png';
var yellowDiscovered = new Image(); yellowDiscovered.src = 'static/images/Cures/yellowCure.png';
var yellowEradicated = new Image(); yellowEradicated.src = 'static/images/Cures/yellowEradicate.png';
var blackDiscovered = new Image(); blackDiscovered.src = 'static/images/Cures/blackCure.png';
var blackEradicated = new Image(); blackEradicated.src = 'static/images/Cures/blackEradicate.png';

cureImages = {'blackEradicated':blackEradicated,'blackDiscovered':blackDiscovered,
'yellowEradicated':yellowEradicated,'yellowDiscovered':yellowDiscovered,
'blueEradicated':blueEradicated,'blueDiscovered':blueDiscovered,
'redEradicated':redEradicated,'redDiscovered':redDiscovered,
'undiscovered':undiscovered};

function cureStatusBar(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.height = options.height;
	this.width=options.width;
	this.xScale = options.xScale;
	this.yScale = options.yScale;
	this.context = options.context;
	this.infection = {yellow:'undiscovered',blue:'undiscovered',black:'undiscovered',red:'undiscovered'};
	
	
	
	this.changeStatus = function(options){
		this.infection[options.colour] = options.status;
	}	
	this.render = function () {
		for (i in this.infection){
			
			// console.log(i)
			this.context.drawImage(
			cureImages[this.infection[i]], //image to use
			0, // x position to start clipping 
			0, // y position to start clipping
			this.width, //width of clipped image
			this.height, // height of clipped image
			this.xPos+((this.width*this.xScale+10)*Object.keys(this.infection).indexOf(i)), //x position for image on canvas
			this.yPos, // y position for image on canvas
			this.width*this.xScale, // width of image to use 
			this.height*this.yScale); // height of image to use
		}
    };	
}
