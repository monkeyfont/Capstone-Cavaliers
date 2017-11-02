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
	this.currentMoves = options.currentMoves || 4;
	
	this.alterMovesCount = function(options){
		//options = {newCount:x}
		this.currentMoves = options.newCount;
	}
	
	this.render = function(){
        // Draw the animation
		this.context.drawImage(
		this.portrait, //image to use
		0, // x position to start clipping 
		0, // y position to start clipping
		this.width, //width of clipped image
		this.height, // height of clipped image
		this.xPos, //x position for image on canvas
		this.yPos, // y position for image on canvas
		this.width*this.xScale, // width of image to use 
		this.height*this.yScale); // height of image to use
		
		this.context.font = "22px Sans-serif"
		this.context.strokeStyle = 'black';//'green';
		this.context.lineWidth = 8;
		this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
		this.context.miterLimit=3;
		this.context.strokeText("Moves: "+this.currentMoves,this.xPos,this.yPos+(this.height*this.yScale));
		this.context.fillStyle = 'white';//this.colour;
		this.context.fillText("Moves: "+this.currentMoves,this.xPos,this.yPos+(this.height*this.yScale));
    };
}