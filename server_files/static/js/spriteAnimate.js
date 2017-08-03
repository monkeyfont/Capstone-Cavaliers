var snd = new Audio("static/A Instrumental Masterpiece.mp3"); // buffers automatically when created

snd.play();
var socket;

socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
        socket.emit('joinGame', {});
    });


socket.on('joined', function (data) {
        console.log(data.msg + '\n');
    });



$('.Audio').on('click', function(e){
		// alert("Button clicked with value: "+e.currentTarget.value);
		if (e.currentTarget.id == "Play"){
			if (snd.paused){
				snd.play();
			}else{
				snd.pause();
			}
			
			alert("play");
		}else if(e.currentTarget.id == "Mute"){
			if (snd.muted == true){
				snd.muted = false;
			}else{
				snd.muted = true;
			}
			alert("Mute");
		}
		
	});

    function myFunction(data){
//$("#clickTest").click(function(){
        // get the value from the movement box
        var value = " has clicked " + data;
        // clear the field
        // submit that value
        socket.emit('click', {mess:value})

    };

    // Console output now shows which player has clicked which coin


socket.on('clicked', function (data) {

        console.log(data.msg);

    });
	
$('.btn').on('click', function(changePlayer){
	if (changePlayer.currentTarget.id == 'up-left'){
		player.yStart=120;
	}
	if (changePlayer.currentTarget.id == 'up'){
		player.yStart=160;
	}
	if (changePlayer.currentTarget.id == 'up-right'){
		player.yStart=280;
	}
	if (changePlayer.currentTarget.id == 'left'){
		player.yStart=80;
	}
	if (changePlayer.currentTarget.id == 'stop'){
		
	}
	if (changePlayer.currentTarget.id == 'right'){
		player.yStart=240;
	}
	if (changePlayer.currentTarget.id == 'down-left'){
		player.yStart=40;
	}
	if (changePlayer.currentTarget.id == 'down'){
		player.yStart=0;
	}
	if (changePlayer.currentTarget.id == 'down-right'){
		player.yStart=200;
	}
	
	
	
	// alert("Button clicked with value: "+changePlayer.currentTarget.id);
		
	});		
	

	
var coinImage = new Image();

coinImage.src = "static/images/coin-sprite-animation.png";
var playerImage = new Image();
playerImage.src = 'static/images/player6.png';
var mapImage = new Image();
mapImage.src = 'static/images/WorldMap.jpg';
var cityImage = new Image();
cityImage.src = "static/images/city token.png";
var scrnWidth = window.innerWidth;//screen.width;
var scrnHeight = window.innerHeight;//screen.height;
console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
var optimalScreenWidth = 1920;
var optimalScreenHeight = 1080;

var screenHeightPercentage = scrnHeight/optimalScreenHeight;
var screenWidthPercentage = scrnWidth/optimalScreenWidth;

var scaleSize = 1;

var cities = {
	city1:{connections:['city2','city3'],x:100,y:100},
	city2:{connections:['city1','city4'],x:400,y:400},
	city3:{connections:['city1','city4'],x:630,y:720},
	city4:{connections:['city2','city3'],x:802,y:605}
};



// sets the scalesize to the lower of height or width
if (screenHeightPercentage<screenWidthPercentage){
	scaleSize = screenHeightPercentage;
}else{
	scaleSize = screenWidthPercentage;
}

var canvas = document.getElementById("myCanvas");
canvas.width = 1920*scaleSize;
canvas.height = 1080*scaleSize;
var context = canvas.getContext("2d");
context.scale(scaleSize,scaleSize);

// console.log(canvas.getContext("2d").getScale())
console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
console.log("scale Size:"+scaleSize);




canvas.addEventListener('click', function(evt) {
	var mousePos ={
		x: (evt.clientX - canvas.getBoundingClientRect().left)/scaleSize,
		y: (evt.clientY - canvas.getBoundingClientRect().top)/scaleSize
	}	
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	console.log(message);
	for (var i in spriteList){
		// is the click on the image?
		if (mousePos.x >= spriteList[i].xPos && mousePos.x <= spriteList[i].xPos+(spriteList[i].width*spriteList[i].xScale) &&
			mousePos.y >= spriteList[i].yPos && mousePos.y <= spriteList[i].yPos+(spriteList[i].height*spriteList[i].yScale)){
				console.log(spriteList[i].id,"was clicked");
				myFunction(spriteList[i].id);
			}
		
		
		
	}
})



function gameLoop(){
	window.requestAnimationFrame(gameLoop);
	// map.update();
	// map.render();
	canvas.getContext("2d").drawImage(mapImage,0,0)// quick workaround because loading the map as a sprite is broken
	
	for (var i in cities){
		canvas.getContext("2d").drawImage(cityImage,cities[i].x,cities[i].y);
	}
	for (var start in cities){
		// console.log("start",start);
		// console.log("connections",cities[start].connections);
		for (var end in cities[start].connections){
			var endCity = cities[cities[start].connections[end]];
			// console.log("end",end);
			// console.log("end city", cities[start].connections[end]);
			// console.log("actual end city", cities[cities[start].connections[end]])

		
		
		context.beginPath(); 
		// Staring point (10,45)
		context.moveTo(cities[start].x+12.5,cities[start].y+12.5);
		// End point (180,47)
		context.lineTo(endCity.x+12.5,endCity.y+12.5);
		// Make the line visible		  
		context.lineWidth = 5;
		// set line color
		context.strokeStyle = 'red';
		context.stroke();
		}
	}
	
	coin.update();
	coin.render();
	coin2.update();
	coin2.render();
	coin3.update();
	coin3.render();
	player.update();
	player.render();
	card.update();
	card.render();
	

	//console.log("gameloop");
}



function sprite(options) {
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
		this.yStart, // y position to start clipping
		this.width, //width of clipped image
		this.height, // height of clipped image
		this.xPos, //x position for image on canvas
		this.yPos, // y position for image on canvas
		this.width*this.xScale, // width of image to use 
		this.height*this.yScale); // height of image to use
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
	id:"coin3",
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
	id:"coin",
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
	id:"coin2",
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
	numberOfFrames: 10,
	ticksPerFrame: 16,
	xPos:400,
	yPos:400,
    image: coinImage	
	});	
	
var player = new sprite({
	id:"player",
	context: canvas.getContext("2d"),
    width: 32,
    height: 40,
	numberOfFrames: 4,
	ticksPerFrame: 16,
	xPos:600,
	yPos:600,
	xScale:2,
	yScale:2,
    image: playerImage
	
})

var CardImage = new Image();
CardImage.src = 'static/images/infection-Cards.png';
var card = new sprite({
	id:"Infection Deck",
	context: canvas.getContext("2d"),
    width: 584,
    height: 800,
	numberOfFrames: 1,
	ticksPerFrame: 1,
	xPos:1600,
	yPos:30,
	xScale:0.5,
	yScale:0.5,
    image: CardImage
	
})

spriteList = [coin,coin2,coin3,player,card];
	
mapImage.addEventListener("load", gameLoop);	
// coinImage.addEventListener("load", gameLoop);
// window.onload = function() {
// coin.render();
// console.log("pie");
// };
