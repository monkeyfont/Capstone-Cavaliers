function portrait(options){
	this.id = options.id;
	this.xPos = options.xPos;
	this.yPos = options.yPos; 
	this.xScale = options.xScale;
	this.yScale = options.yScale;
	this.height = options.height;
	this.width = options.width;
	this.portrait = options.image;
	this.context = options.context;
	
	
	this.render = function(){
        // Draw the animation
		console.log("image render",this.portrait.src)
		this.context.drawImage(
		this.portrait, //image to use
		0, // x position to start clipping 
		0, // y position to start clipping
		this.width, //width of clipped image
		this.height, // height of clipped image
		this.xPos, //x position for image on canvas
		this.yPos, // y position for image on canvas
		this.widthDraw*this.xScale, // width of image to use 
		this.heightDraw*this.yScale); // height of image to use
    };
}