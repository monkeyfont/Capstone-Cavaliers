var undiscovered = new image();
var redDiscovered = new image();
var redEradicated = new image();
var blueDiscovered = new image();
var blueEradicated = new image();
var yellowDiscovered = new image();
var yellowEradicated = new image();
var blackDiscovered = new image();
var blackEradicated = new image();

function cureStatusBar(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.infection = {yellow:'undiscovered',blue:'undiscovered',black:'undiscovered',red:'undiscovered'};
	
	
	
	this.changeStatus = function(options){
		this.infection[options.colour] = options.status;
	}	
	this.render = function () {
        // Draw the animation
		//console.log("image render",this.image.src)
		this.context.drawImage(
		this.image, //image to use
		this.frameIndex * this.width, // x position to start clipping 
		this.yStart, // y position to start clipping
		this.width, //width of clipped image
		this.height, // height of clipped image
		this.xPos, //x position for image on canvas
		this.yPos, // y position for image on canvas
		this.width*this.xScale, // width of image to use 
		this.height*this.yScale); // height of image to use
    };	
}