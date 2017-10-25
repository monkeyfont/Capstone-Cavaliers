function infectionCard(options){
	this.id = options.id,			
	this.context = options.context;
	this.width = options.width;
	this.height = options.height;
	this.widthDraw = options.width;
	this.heightDraw = options.height;
	this.imageFront = options.imageFront;
	// this.imageBack = options.imageBack;
	this.yPos = options.yPos || 0;
	this.xPos = options.xPos || 0;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.moveX = this.xPos;
	this.moveY = this.yPos;
	this.speed = options.speed || 10;
	// this.tempSpeed = 0;
	// this.flipping = false;
	// this.flipSpeed = options.flipSpeed || 20;
	// this.flipStage = 0;
	// this.toFlip = false;
	this.currentImage = this.imageFront,
	// this.flip = function() {
		// // if the card is on its back flip to its front
		// // scale the card down
		// // swap the card
		// // scale the card up
		// this.flipping = true;
		// if (this.flipStage == 10){

		// }else{
			// this.widthDraw -= this.width/this.flipSpeed;
		// }
		// if (this.widthDraw <0.1 && this.widthDraw > -0.1){
			// this.toFlip=true;
		// }

		// if (this.toFlip == true){
			// if (this.currentImage==this.imageBack){
				// this.currentImage = this.imageFront;
			// }else{
				// this.currentImage=this.imageBack;
			// }
			// this.toFlip = false;
		// }


		// if (this.widthDraw <= -this.width){
			// this.flipping = false;
			// this.widthDraw = this.width;
			// this.xPos = this.xPos-(this.width*this.xScale);
		// }
	// }
	
	
	
	
	this.move = function (x, y){
		this.moveX = x;
		this.moveY = y;		
	}
	
	
	this.update = function(){		
		
		var deltaX = this.xPos - this.moveX;
		var deltaY = this.yPos - this.moveY;
		if ( deltaX != 0  || deltaY != 0){

			// work out the distance a^2 + b^2 = c^2 where deltaX and DeltaY are a and b
			
			var distance = Math.sqrt((deltaX**2)+(deltaY**2));
			// console.log("distance",distance);
			this.tempSpeed = distance / Math.ceil(distance / this.speed);
			// console.log("temp speed",this.tempSpeed)
			var incrementX = deltaX/(distance/this.tempSpeed);
			var incrementY = deltaY/(distance/this.tempSpeed);
			// console.log("increment",incrementX,incrementY);
			
			// if (this.moveX == this.xPos){
				// this.tempSpeed = 10;
			// }else if (this.moveY == this.yPos){
				// this.tempSpeed = 10;
			// }else{
				
			// }
			
			if (this.moveX != this.xPos){
				if (this.moveX <= this.xPos){
					this.xPos = this.xPos - incrementX
				}else{
					this.xPos = this.xPos - incrementX
				}
			}
			if (this.moveY != this.yPos){
				if (this.moveY <= this.yPos){
					this.yPos = this.yPos - incrementY
				}else{
					this.yPos = this.yPos - incrementY
				}
				
			}
		}
	}
	this.render = function () {
		// if (this.flipping == true){
			// this.flip();
		// }
		this.update();
        // Draw the animation
		//console.log("image render",this.image.src)
		
		this.context.drawImage(
		this.currentImage, //image to use
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