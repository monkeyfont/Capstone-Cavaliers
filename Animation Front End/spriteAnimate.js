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
	coin.update();
	coin.render();
	coin2.update();
	coin2.render();
	//console.log("gameloop");
}



function sprite (options) {
				
    var that = {};
		frameIndex = 0, //current frame being rendered
		tickCount = 0,	// number of updates since the last render 
		ticksPerFrame = options.ticksPerFrame || 0; //by having ticks per frame, it allows us to slow the animation down, and still fun a game at 60fps, 
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		that.loop = options.loop || true; // do we loop the sprite, or just play it once
		that.yPos = options.yPos || 0;
		that.xPos = options.yPos || 0;
		numberOfFrames = options.numberOfFrames || 1;
	that.update = function(){ //update the frame every x ticks 
		//console.log("updated",that.image.src);
		tickCount +=1;
		if (tickCount > ticksPerFrame){
			tickCount = 0;
			if (frameIndex<numberOfFrames-1){
				frameIndex +=1;
			}else if (that.loop){
				frameIndex=0
			}
			
		}
	}
	that.render = function () {
        // Draw the animation
		//console.log("image render",that.image.src)
		that.context.drawImage(
		that.image, //image to use
		frameIndex * that.width, // x position to start clipping 
		0, // y position to start clipping
		that.width, //width of clipped image
		that.height, // height of clipped image
		that.xPos, //x position for image on canvas
		that.yPos, // y position for image on canvas
		that.width, // width of image to use 
		that.height); // height of image to use
    };
	
    return that;
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
	
var coin = sprite({
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
	numberOfFrames: 10,
	ticksPerFrame: 100,
	xPos:100,
	yPos:100,
    image: coinImage	
	});	

var coin = sprite({
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
	numberOfFrames: 10,
	ticksPerFrame: 16,
	xPos:100,
	yPos:100,
    image: coinImage	
	});		
	
var coin2 = sprite({
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
