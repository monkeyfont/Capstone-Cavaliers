var coinImage = new Image();
coinImage.src = "coin-sprite-animation.png";
var mapImage = new Image();
mapImage.src = 'WorldMap.jpg';
var scrnWidth = window.innerWidth;//screen.width;
var scrnHeight = window.innerHeight;//screen.height;
console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
var optimalScreenWidth = 1920;
var optimalScreenHeight = 1080;

var screenHeightPercentage = scrnHeight/optimalScreenHeight;
var screenWidthPercentage = scrnWidth/optimalScreenWidth;

var scaleSize = 1;

// sets the scalesize to the lower of height or width
if (screenHeightPercentage<screenWidthPercentage){
	scaleSize = screenHeightPercentage;
}else{
	scaleSize = screenWidthPercentage;
}

var canvas = document.getElementById("myCanvas");
canvas.getContext("2d").scale(scaleSize,scaleSize);
console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
console.log("scale Size:"+scaleSize);

function gameLoop(){
	window.requestAnimationFrame(gameLoop);
	// map.update();
	// map.render();
	canvas.getContext("2d").drawImage(mapImage,0,0)// quick workaround because loading the map as a sprite is broken
	console.log("coin3"+coin3.tickCount);
	console.log("coin2"+coin2.tickCount);
	coin.update();
	coin.render();
	coin2.update();
	coin2.render();
	coin3.update();
	coin3.render();

	//console.log("gameloop");
}



function sprite(options) {
				
	this.frameIndex = 0, //current frame being rendered
	this.tickCount = 0,	// number of updates since the last render 
	this.ticksPerFrame = options.ticksPerFrame || 0; //by having ticks per frame, it allows us to slow the animation down, and still fun a game at 60fps, 
	this.context = options.context;
	this.width = options.width;
	this.height = options.height;
	this.image = options.image;
	this.loop = options.loop || true; // do we loop the sprite, or just play it once
	this.yPos = options.yPos || 0;
	this.xPos = options.yPos || 0;
	this.numberOfFrames = options.numberOfFrames || 1;
	
	this.update = function(){ //update the frame every x ticks 
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
        // Draw the animation
		//console.log("image render",this.image.src)
		this.context.drawImage(
		this.image, //image to use
		this.frameIndex * this.width, // x position to start clipping 
		0, // y position to start clipping
		this.width, //width of clipped image
		this.height, // height of clipped image
		this.xPos, //x position for image on canvas
		this.yPos, // y position for image on canvas
		this.width, // width of image to use 
		this.height); // height of image to use
    };
}


// canvas.width = 1000;
// canvas.height = 1000;



// var map = sprite({
	// context: canvas.getContext("2d"),
    // width: 1920,
    // height: 1080,
	// numberOfFrames: 1,
	// ticksPerFrame: 10,
	// image: mapImage
	// });	
	
var coin3 = new sprite({
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
	numberOfFrames: 10,
	ticksPerFrame: 3,
	xPos:300,
	yPos:300,
    image: coinImage	
	});	

var coin = new sprite({
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
	numberOfFrames: 10,
	ticksPerFrame: 16,
	xPos:100,
	yPos:100,
    image: coinImage	
	});		
	
var coin2 = new sprite({
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
	numberOfFrames: 10,
	ticksPerFrame: 16,
	xPos:400,
	yPos:400,
    image: coinImage	
	});	
	
mapImage.addEventListener("load", gameLoop);	
// coinImage.addEventListener("load", gameLoop);
// window.onload = function() {
// coin.render();
// console.log("pie");
// };
