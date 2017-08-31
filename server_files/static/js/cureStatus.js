var undiscovered = new Image();
var redDiscovered = new Image();
var redEradicated = new Image();
var blueDiscovered = new Image();
var blueEradicated = new Image();
var yellowDiscovered = new Image();
var yellowEradicated = new Image();
var blackDiscovered = new Image();
var blackEradicated = new Image();

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
