
//-------------------------PLAYER ACTIONS WEB SOCKET FUNCTIONS----------------
var mapImage = new Image();
mapImage.src = 'static/images/backgroundMap.jpg'






canvas.addEventListener('click', function(evt) {
	var mousePos ={
		x: (evt.clientX - canvas.getBoundingClientRect().left)/scaleSize,
		y: (evt.clientY - canvas.getBoundingClientRect().top)/scaleSize
	}
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	//console.log(message);


	for (var i in spriteList){
		// is the click on the image?
		if (mousePos.x >= spriteList[i].xPos && mousePos.x <= spriteList[i].xPos+(spriteList[i].width*spriteList[i].xScale) &&
			mousePos.y >= spriteList[i].yPos && mousePos.y <= spriteList[i].yPos+(spriteList[i].height*spriteList[i].yScale)){
				console.log(spriteList[i].id,"was clicked");
				// myFunction(spriteList[i].id);
				if (spriteList[i].id == 'Infection Card'){
					spriteList[i].flip();
				}

			}
	}


	for (var i in locations){
		if (mousePos.x >= locations[i].xPos-locations[i].radius && mousePos.x <= (locations[i].xPos+locations[i].radius) &&
			mousePos.y >= locations[i].yPos-locations[i].radius && mousePos.y <= (locations[i].yPos+locations[i].radius)){
				//console.log('city ', i ,' was clicked');
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


	outbreakCount.render();
	infectRate.render();
	
	playersHand.render();
	
	playerPortraits.render();
	cureBar.render();
	
}


var CardImage = new Image();
CardImage.src = 'static/images/infection-Cards.png';
var cardFront = new Image();
cardFront.src = 'static/images/infection-Front.png';


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
	socket.emit('getInfections')
	socket.emit('getPlayersHands')

	}
