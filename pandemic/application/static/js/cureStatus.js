var undiscovered = new Image(); undiscovered.src = 'static/images/Cures/emptyCure.png';
var redDiscovered = new Image(); redDiscovered.src = 'static/images/Cures/redCure.png';
var redEradicated = new Image(); redEradicated.src = 'static/images/Cures/redEradicate.png';
var blueDiscovered = new Image(); blueDiscovered.src = 'static/images/Cures/blueCure.png';
var blueEradicated = new Image(); blueEradicated.src = 'static/images/Cures/blueEradicate.png';
var yellowDiscovered = new Image(); yellowDiscovered.src = 'static/images/Cures/yellowCure.png';
var yellowEradicated = new Image(); yellowEradicated.src = 'static/images/Cures/yellowEradicate.png';
var blackDiscovered = new Image(); blackDiscovered.src = 'static/images/Cures/blackCure.png';
var blackEradicated = new Image(); blackEradicated.src = 'static/images/Cures/blackEradicate.png';

cureImages = {'blackEradicated':blackEradicated,'blackDiscovered':blackDiscovered,'blackUndiscovered':undiscovered,
'yellowEradicated':yellowEradicated,'yellowDiscovered':yellowDiscovered,'yellowUndiscovered':undiscovered,
'blueEradicated':blueEradicated,'blueDiscovered':blueDiscovered,'blueUndiscovered':undiscovered,
'redEradicated':redEradicated,'redDiscovered':redDiscovered,'redUndiscovered':undiscovered};

function cureStatusBar(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.height = options.height;
	this.width=options.width;
	this.xScale = options.xScale;
	this.yScale = options.yScale;
	this.context = options.context;
	this.infection = {yellow:'Undiscovered',blue:'Undiscovered',black:'Undiscovered',red:'Undiscovered'};
	
	
	
	this.changeStatus = function(options){
		//options = {colour:'yellow'|'red'|'black'|'blue', status:'Undiscovered'|'Discovered'|'Eradicated'}
		this.infection[options.colour] = options.status;
	}	
	this.render = function () {
		for (i in this.infection){
			currentImage = cureImages[i+this.infection[i]];
			// console.log(i)
			this.context.drawImage(
			currentImage, //image to use
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
