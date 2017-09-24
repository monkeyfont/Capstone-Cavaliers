var scrnWidth = window.innerWidth;//screen.width;
var scrnHeight = window.innerHeight;//screen.height;
console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
var optimalScreenWidth = 2560; //1920
var optimalScreenHeight = 1440; //1080;

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
canvas.width = optimalScreenWidth*scaleSize;
canvas.height = optimalScreenHeight*scaleSize;
var context = canvas.getContext("2d");
context.scale(scaleSize,scaleSize);

console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
console.log("scale Size:"+scaleSize);








//-------------------------PLAYER ACTIONS WEB SOCKET FUNCTIONS----------------



var mapImage = new Image();
mapImage.src = 'static/images/backgroundMap.jpg'






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
				// myFunction(spriteList[i].id);
				if (spriteList[i].id == 'Infection Card'){
					spriteList[i].flip();
				}
				// if (spriteList[i].id == 'Infection Deck'){
					// createCard(cardNumber);
					// cardNumber ++;
				// }
			}
	}
	// for (var i in cardList){
		// if (mousePos.x >= cardList[i].xPos && mousePos.x <= cardList[i].xPos+(cardList[i].width*cardList[i].xScale) &&
			// mousePos.y >= cardList[i].yPos && mousePos.y <= cardList[i].yPos+(cardList[i].height*cardList[i].yScale)){
			// console.log(cardList[i].id,"was clicked------------------");
			// console.log(cardList[i].toFlip,"was clicked------------------");
			// cardList[i].flip();
		// }
	// }

	for (var i in locations){
		if (mousePos.x >= locations[i].xPos-locations[i].radius && mousePos.x <= (locations[i].xPos+locations[i].radius) &&
			mousePos.y >= locations[i].yPos-locations[i].radius && mousePos.y <= (locations[i].yPos+locations[i].radius)){
				console.log('city ', i ,' was clicked');
				checkMove(i);

			}

	}


})



function gameLoop(){
	window.requestAnimationFrame(gameLoop);


	// map.update();
	// map.render();
	canvas.getContext("2d").drawImage(mapImage,0,0)// quick workaround because loading the map as a sprite is broken

/* 	for (var i in cities){
		canvas.getContext("2d").drawImage(cityImage,cities[i].x,cities[i].y);
		// context.font="30px Verdana";
		// context.fillStyle = 'red';
		// context.fillText(i,cities[i].x,cities[i].y);
	} */
	// console.log("city",locations['TOKYO'])
	for (var start in locations){
		// console.log("start",locations[start].id);
		// console.log("connections",locations[start].connections);
		for (var end in locations[start].connections){
			// console.log("end",end);
			// console.log("end city", locations[locations[start].connections[end]]);
			var endCity = locations[locations[start].connections[end]];

			if (Math.abs(locations[start].xPos-endCity.xPos) > 800){
				context.beginPath();
				// Staring point (10,45)
				context.moveTo(locations[start].xPos,locations[start].yPos);
				// End point (180,47)
				if (locations[start].xPos >800){
					((locations[start].yPos-endCity.yPos)/2)
					context.lineTo(1920,endCity.yPos+((locations[start].yPos-endCity.yPos)/2));
				}else{
					context.lineTo(0,endCity.yPos+((locations[start].yPos-endCity.yPos)/2));
				}
				// Make the line visible
				context.lineWidth = 4;
				// set line color
				context.strokeStyle = 'rgba(225,225,225,0.5)';
				context.stroke();
			}else{
			//console.log("actual end city", locations[locations[start].connections[end]].id)
				context.beginPath();
				// Staring point (10,45)
				context.moveTo(locations[start].xPos,locations[start].yPos);
				// End point (180,47)
				context.lineTo(endCity.xPos,endCity.yPos);
				// Make the line visible
				context.lineWidth = 4;
				// set line color

				context.strokeStyle = 'rgba(225,225,225,0.5)';
				context.stroke();
			}

		}
	}
	for (var i in locations){
		locations[i].render();
	}

	players.render();
	deck.render();
	// card.render();
	// for (var i in cardList){
		// cardList[i].render();
	// }

	outbreakCount.render();
	infectRate.render();
	
	playersHand.render();
	
	playerPortraits.render();
	cureBar.render();
	
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




// var coin3 = new sprite({
	// id:"coin3",
    // context: canvas.getContext("2d"),
    // width: 100,
    // height: 100,
	// numberOfFrames: 10,
	// ticksPerFrame: 3,
	// xPos:300,
	// yPos:300,
    // image: coinImage
	// });

// var coin = new sprite({
	// id:"coin",
    // context: canvas.getContext("2d"),
    // width: 100,
    // height: 100,
	// numberOfFrames: 10,
	// ticksPerFrame: 16,
	// xPos:100,
	// yPos:100,
    // image: coinImage
	// });

// var coin2 = new sprite({
	// id:"coin2",
    // context: canvas.getContext("2d"),
    // width: 100,
    // height: 100,
	// numberOfFrames: 10,
	// ticksPerFrame: 16,
	// xPos:400,
	// yPos:400,
    // image: coinImage
	// });

// var player = new player({
	// id:"player",
	// context: canvas.getContext("2d"),
    // width: 32,
    // height: 40,
	// numberOfFrames: 4,
	// ticksPerFrame: 16,
	// xPos:ATLANTA.xPos,
	// yPos:ATLANTA.yPos,
	// xScale:2,
	// yScale:2,
    // image: playerImage
// })

var CardImage = new Image();
CardImage.src = 'static/images/infection-Cards.png';
var cardFront = new Image();
cardFront.src = 'static/images/infection-Front.png';
// var card = new flippable({
	// id:"Infection Card",
	// context: canvas.getContext("2d"),
    // width: 584,
    // height: 800,
	// numberOfFrames: 1,
	// ticksPerFrame: 1,
	// xPos:1600,
	// yPos:40,
	// xScale:0.5,
	// yScale:0.5,
    // imageBack: CardImage,
	// imageFront: cardFront
// })

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
// var cardList = [];
// function createCard(id) {
	// this.cardListing = cardList.push(new flippable({
	// id:"Infection Card "+id,
	// context: canvas.getContext("2d"),
    // width: 584,
    // height: 800,
	// numberOfFrames: 1,
	// ticksPerFrame: 1,
	// xPos:1600,
	// yPos:40,
	// xScale:0.5,
	// yScale:0.5,
    // imageBack: CardImage,
	// imageFront: cardFront
// }))
// }



// function flippable(options) {
	// this.id = options.id,
	// this.context = options.context;
	// this.width = options.width;
	// this.height = options.height;
	// this.widthDraw = options.width;
	// this.heightDraw = options.height;
	// this.imageBack = options.imageBack;
	// this.imageFront = options.imageFront;
	// this.loop = options.loop || true; // do we loop the sprite, or just play it once
	// this.yPos = options.yPos || 0;
	// this.xPos = options.xPos || 0;
	// this.xScale = options.xScale || 1;
	// this.yScale = options.yScale || 1;
	// this.flipping = false;
	// this.flipSpeed = options.flipSpeed || 20;
	// this.flipStage = 0;
	// this.currentImage = this.imageBack;
	// this.toFlip = false;
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

	// // take image 1, shrink into middle, show image 2 grow from middle

	// this.render = function () {
		// if (this.flipping == true){
			// this.flip();
		// }
        // // Draw the animation
		// //console.log("image render",this.image.src)
		// this.context.drawImage(
		// this.currentImage, //image to use
		// 0, // x position to start clipping
		// 0, // y position to start clipping
		// this.width, //width of clipped image
		// this.height, // height of clipped image
		// this.xPos, //x position for image on canvas
		// this.yPos, // y position for image on canvas
		// this.widthDraw*this.xScale, // width of image to use
		// this.heightDraw*this.yScale); // height of image to use
    // };
// }

outbreakCount = new outbreakCounter({});
infectRate = new infectionRate({});
playersHand = new playerHand();
players = new playerInitilization();


// card,
spriteList = [deck];

mapImage.addEventListener("load", gameLoop);



playerPortraits = new portraitInitilization({});
playerPortraits.addPlayerPortrait({});

cureBar = new cureStatusBar({
	context: canvas.getContext("2d"),
	xPos:680,
	yPos:70,
	height:256,
	width:256,
	xScale:0.4,
	yScale:0.4	
});



window.onload = function (){
	socket.emit('getPlayerObject') 
	socket.emit('getGameInitialization')
	socket.emit('getinitInfections')
	socket.emit('getPlayersHands')

	}
