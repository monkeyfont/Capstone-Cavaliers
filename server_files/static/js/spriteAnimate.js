var snd = new Audio("static/A Instrumental Masterpiece.mp3"); // buffers automatically when created

snd.play();
var cardNumber = 0;
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
	city2:{connections:['city1','city4','city5'],x:400,y:400},
	city3:{connections:['city1','city4','city5'],x:630,y:720},
	city4:{connections:['city2','city3'],x:802,y:605},
	city5:{connections:['city2','city3'],x:1824,y:950}
};

function city(options){
	this.id = options.id;
	this.colour = options.colour;
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.researchStation = options.researchStation || false;
	this.infectionStatus = options.infectionStatus || {black:0,blue:0,yellow:0,red:0}
	this.connections = options.connections || []
}

var SanFrancisco = new city({id:'San-Francisco',colour:'blue',xPos:260,yPos:410})


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

	player.move(mousePos.x,mousePos.y);
	for (var i in spriteList){
		// is the click on the image?
		if (mousePos.x >= spriteList[i].xPos && mousePos.x <= spriteList[i].xPos+(spriteList[i].width*spriteList[i].xScale) &&
			mousePos.y >= spriteList[i].yPos && mousePos.y <= spriteList[i].yPos+(spriteList[i].height*spriteList[i].yScale)){
				console.log(spriteList[i].id,"was clicked");
				myFunction(spriteList[i].id);
				if (spriteList[i].id == 'Infection Card'){
					spriteList[i].flip();
				}
				if (spriteList[i].id == 'Infection Deck'){
					createCard(cardNumber);
					cardNumber ++;
				}
			}
	}
	for (var i in cardList){
		if (mousePos.x >= cardList[i].xPos && mousePos.x <= cardList[i].xPos+(cardList[i].width*cardList[i].xScale) &&
			mousePos.y >= cardList[i].yPos && mousePos.y <= cardList[i].yPos+(cardList[i].height*cardList[i].yScale)){
			console.log(cardList[i].id,"was clicked------------------");	
			console.log(cardList[i].toFlip,"was clicked------------------");
			cardList[i].flip();
		}
	}

	for (var i in cities){
		if (mousePos.x >= cities[i].x && mousePos.x <= (cities[i].x + 25) &&
			mousePos.y >= cities[i].y && mousePos.y <= (cities[i].y + 25)){
				console.log(i,'was clicked');
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
		// context.font="30px Verdana";
		// context.fillStyle = 'red';
		// context.fillText(i,cities[i].x,cities[i].y);
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
	deck.render();
	card.render();
	for (var i in cardList){
		cardList[i].render();
	}
	for (var i in cities){

		context.font="30px Verdana";
		context.fillStyle = 'orange';
		context.fillText(i,cities[i].x,cities[i].y);
	}
	
	
	
	// console.log(card.flipping,card.width);
	// console.log("-----------------------",card.toFlip);
	

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
		if ( deltaX != 0  && deltaY != 0){
			// work out the distance a^2 + b^2 = c^2 where deltaX and DeltaY are a and b
			
			var distance = Math.sqrt((deltaX**2)+(deltaY**2));
			// console.log("distance",distance);
			this.tempSpeed = distance / Math.ceil(distance / this.speed);
			// console.log("temp speed",this.tempSpeed)
			var incrementX = deltaX/(distance/this.tempSpeed);
			var incrementY = deltaY/(distance/this.tempSpeed);
			// console.log("increment",incrementX,incrementY);
			
			if (this.moveX == this.xPos){
				this.tempSpeed = 10;
			}else if (this.moveY == this.yPos){
				this.tempSpeed = 10;
			}else{
				
			}
			
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
var cardFront = new Image();
cardFront.src = 'static/images/infection-Front.png';
var card = new flippable({
	id:"Infection Card",
	context: canvas.getContext("2d"),
    width: 584,
    height: 800,
	numberOfFrames: 1,
	ticksPerFrame: 1,
	xPos:1600,
	yPos:40,
	xScale:0.5,
	yScale:0.5,
    imageBack: CardImage,	
	imageFront: cardFront
})

var deck = new sprite({
	id:"Infection Deck",
	context: canvas.getContext("2d"),
    width: 584,
    height: 800,
	numberOfFrames: 1,
	ticksPerFrame: 1,
	xPos:1600,
	yPos:40,
	xScale:0.5,
	yScale:0.5,
    image: CardImage	

})
var cardList = [];
function createCard(id) {
	this.cardListing = cardList.push(new flippable({
	id:"Infection Card "+id,
	context: canvas.getContext("2d"),
    width: 584,
    height: 800,
	numberOfFrames: 1,
	ticksPerFrame: 1,
	xPos:1600,
	yPos:40,
	xScale:0.5,
	yScale:0.5,
    imageBack: CardImage,	
	imageFront: cardFront
}))
}



function flippable(options) {
	this.id = options.id,			
	this.context = options.context;
	this.width = options.width;
	this.height = options.height;
	this.widthDraw = options.width;
	this.heightDraw = options.height;
	this.imageBack = options.imageBack;
	this.imageFront = options.imageFront;
	this.loop = options.loop || true; // do we loop the sprite, or just play it once
	this.yPos = options.yPos || 0;
	this.xPos = options.xPos || 0;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.flipping = false;
	this.flipSpeed = options.flipSpeed || 20;
	this.flipStage = 0;
	this.currentImage = this.imageBack;
	this.toFlip = false;
	this.flip = function() {
		// if the card is on its back flip to its front
		// scale the card down
		// swap the card
		// scale the card up
		this.flipping = true;
		if (this.flipStage == 10){
			
		}else{
			this.widthDraw -= this.width/this.flipSpeed;
		}
		if (this.widthDraw <0.1 && this.widthDraw > -0.1){
			this.toFlip=true;
		}
		
		if (this.toFlip == true){
			if (this.currentImage==this.imageBack){
				this.currentImage = this.imageFront;
			}else{
				this.currentImage=this.imageBack;
			}
			this.toFlip = false;
		}
			
		
		if (this.widthDraw <= -this.width){
			this.flipping = false;
			this.widthDraw = this.width;
			this.xPos = this.xPos-(this.width*this.xScale);
		}
	}
	
	// take image 1, shrink into middle, show image 2 grow from middle
	
	this.render = function () {
		if (this.flipping == true){
			this.flip();
		}
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

spriteList = [coin,coin2,coin3,player,card,deck];
	
mapImage.addEventListener("load", gameLoop);	
// coinImage.addEventListener("load", gameLoop);
// window.onload = function() {
// coin.render();
// console.log("pie");
// };
