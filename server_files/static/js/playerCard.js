function playerCard(options){
	this.id = options.id,			
	this.frameIndex = 0, //current frame being rendered
	this.tickCount = 0,	// number of updates since the last render 
	this.ticksPerFrame = options.ticksPerFrame || 0; //by having ticks per frame, it allows us to slow the animation down, and still fun a game at 60fps, 
	this.context = options.context;
	this.width = options.width;
	this.height = options.height;
	this.image = options.image;
	this.loop = options.loop || true; // do we loop the sprite, or just play it once
	this.yPos = options.yPos || 0;
	this.xPos = options.xPos || 0;
	this.numberOfFrames = options.numberOfFrames || 1;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.yStart = options.yStart || 0;
	this.moveX = this.xPos;
	this.moveY = this.yPos;
	this.speed = options.speed || 10;
	this.tempSpeed = 0;
	
	
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
		//update the frame every x ticks 
		//console.log("updated",this.image.src);
		this.tickCount +=1;
		if (this.tickCount > this.ticksPerFrame){
			this.tickCount = 0;
			if (this.frameIndex<this.numberOfFrames-1){
				this.frameIndex +=1;
			}else if (this.loop){
				this.frameIndex=0
			}
			
		}
	}
	this.render = function () {
		this.update();
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