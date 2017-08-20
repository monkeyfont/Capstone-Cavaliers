function infection(options) {
	this.id = options.id,	
	this.colour = options.colour,
	this.context = options.context || canvas.getContext("2d");
	this.width = options.width;
	this.height = options.height;
	this.image = options.image;
	this.yPos = options.yPos || 0;
	this.xPos = options.xPos || 0;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.moveX = this.xPos;
	this.moveY = this.yPos;
	this.speed = options.speed || 10;
	this.tempSpeed = 0;
	this.infectionPath = options.infectionPath || [];
	// [{x:200,y:200},{x:300,y:300}]
	this.moveCity = function(){
		if (this.infectionPath.length>0){
			if (this.infectionPath[this.infectionPath.length-1].x == this.xPos && 
			this.infectionPath[this.infectionPath.length-1].y == this.yPos){
				this.infectionPath.pop()
				if (this.infectionPath.length>0){
					this.move(this.infectionPath[this.infectionPath.length-1].x,this.infectionPath[this.infectionPath.length-1].y);
				}
			}else{
				if(this.infectionPath[this.infectionPath.length-1].x != this.moveX || 
				this.infectionPath[this.infectionPath.length-1].y != this.moveY){
					this.move(this.infectionPath[this.infectionPath.length-1].x,this.infectionPath[this.infectionPath.length-1].y);
				}
			}
			this.update();
			
			// are we on the last city? if yes, pop it off and go for the next one 
			// are we already aiming for the last city, if yes, its unchanged. 
		}
	}
	
	
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
        // Draw the animation
		// console.log("rendering infection")
		//console.log("image render",this.image.src)
		this.context.drawImage(
		this.image, //image to use
		0, // x position to start clipping 
		0, // y position to start clipping
		this.width, //width of clipped image
		this.height, // height of clipped image
		this.xPos, //x position for image on canvas
		this.yPos, // y position for image on canvas
		this.width*this.xScale, // width of image to use 
		this.height*this.yScale); // height of image to use
    };
}