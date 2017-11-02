var mapImage = new Image();
mapImage.src = 'static/images/WorldMap1235p.png'


var previousLocation = false;
canvas.addEventListener('mousemove', function(evt) {
	var mousePos ={
		x: (evt.clientX - canvas.getBoundingClientRect().left)/scaleSize,
		y: (evt.clientY - canvas.getBoundingClientRect().top)/scaleSize
	}
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	// console.log(message)

	var locationFound = false;
	for (var i in locations){
		if (mousePos.x >= locations[i].xPos-locations[i].radius && mousePos.x <= (locations[i].xPos+locations[i].radius) &&
			mousePos.y >= locations[i].yPos-locations[i].radius && mousePos.y <= (locations[i].yPos+locations[i].radius)){
				console.log('city ', i ,' is hovered on');
				locations[i].cursorOn()
				previousLocation = i;
				locationFound = true;
				// checkMove(i);

			}

	}
	if (locationFound == false){
		console.log("no location")
		if (previousLocation != false){
			console.log("cursor off")
			locations[previousLocation].cursorOff();
			previousLocation = false;
		}
	}



	});


canvas.addEventListener('click', function(evt) {
	var mousePos ={
		x: (evt.clientX - canvas.getBoundingClientRect().left)/scaleSize,
		y: (evt.clientY - canvas.getBoundingClientRect().top)/scaleSize
	}
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	console.log(message);

	//is the deck clicked?
	
	// if (mousePos.x >= 1970 && mousePos.x <= 1970 + 200 
		// && mousePos.y >= 950 && mousePos.y <= 950 +280){
			// console.log("deck was clicked");
			// discardPile.toggleActive();
		// }

	

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
				console.log('city ', i ,' was clicked');
				if (actionState.selectedCity(i)){
					
				}else{
					checkMove(i);
				}
			}

	}
	if (eventCardViewer.click(mousePos)){
	}else if(discardPile.click(mousePos)){
		
	}else if(playerActionsMenu.clickSubMenu(mousePos)){
		
	}else if (playersHand.cardX(mousePos)){
		
	}else if (playersHand.cardClick(mousePos)) {
		
	}else{
		actionState.changeCurrentState({newState:playerActionsMenu.activateAction(mousePos)})
	}

})



function gameLoop(){
	window.requestAnimationFrame(gameLoop);

	canvas.getContext("2d").drawImage(mapImage,0,0)// quick workaround because loading the map as a sprite is broken


	for (var start in locations){

		for (var end in locations[start].connections){

			var endCity = locations[locations[start].connections[end]];

			if (Math.abs(locations[start].xPos-endCity.xPos) > 800){
				context.beginPath();

				context.moveTo(locations[start].xPos,locations[start].yPos);

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

				context.beginPath();

				context.moveTo(locations[start].xPos,locations[start].yPos);

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
	playerActionsMenu.render()
	infectionsMeterDisplay.render();
	messageAlert.render();
	if (!previousLocation == false){
		locations[previousLocation].renderMenu();	
	}
	
	discardPile.render();
	eventCardViewer.render();
	endScreen.render();
}

// locations["ATLANTA"].infect({});
// locations["ATLANTA"].infect({colour:"red"});
// locations["ATLANTA"].infect({colour:"yellow"});
// locations["ATLANTA"].infect({colour:"black"});


var CardImage = new Image();
CardImage.src = 'static/images/Cards/special/PLAYER_BACK.png';
var cardFront = new Image();
cardFront.src = 'static/images/infection-Front.png';

discardPile = new discardPile({
	context: canvas.getContext("2d"),
	xPos: optimalScreenWidth/2,
	yPos: 500, 
})

discardPile.addCard([{cardName:'SANFRANCISCO'},{cardName:'CHICAGO'},{cardName:'MONTREAL'},{cardName:'NEWYORK'},{cardName:'ATLANTA'}])


eventCardViewer = new eventCardViewer({
	context:canvas.getContext("2d"),
	xPos:848,
	yPos:200
})


var deck = new sprite({
	id:"Infection Deck",
	context: canvas.getContext("2d"),
    width: 200,
    height: 280,
	numberOfFrames: 1,
	ticksPerFrame: 1,
	xPos:1970,
	yPos:950,
	xScale:1,
	yScale:1,
    image: CardImage


	
})

outbreakCount = new outbreakCounter({});
playersHand = new playerHand();
players = new playerInitilization();
playerPortraits = new portraitInitilization({});
infectionsMeterDisplay= new infectionMeter({});
outbreakCount = new outbreakCounter({});
infectRate = new infectionRate({});
endScreen = new endScreen({
	context: canvas.getContext("2d"),
	width: optimalScreenWidth,
	height: optimalScreenHeight
})

// card,
spriteList = [deck];

mapImage.addEventListener("load", gameLoop);




infectionsMeterDisplay = new infectionMeter({
	context: canvas.getContext("2d"),
	xPos:1220,
	yPos:80
})


cureBar = new cureStatusBar({
	context: canvas.getContext("2d"),
	xPos:425,
	yPos:70,
	height:256,
	width:256,
	xScale:0.4,
	yScale:0.4
});



playerActionsMenu = new playerActionsBar({
	context: canvas.getContext("2d"),
	height: 400,
	width: 1920,
	yPos: 1000

});


messageAlert = new messageAlert ({
	context: canvas.getContext("2d"),
	xPos: 940,
	yPos: 590
});



// locations.SANFRANCISCO.addResearchStation();

locations.ATLANTA.infect({colour:"red"})
locations.ATLANTA.infect({colour:"blue"})
locations.ATLANTA.infect({colour:"yellow"})
locations.ATLANTA.infect({colour:"black"})
// locations.ATLANTA.addResearchStation();


var load = document.getElementById("load");
var thisPlayerName;
var thisPlayerRole;
canvas.style="display:none;"



window.onload = function (){
	socket.emit('getPlayerObject')
	socket.emit('getGameInitialization')
	socket.emit('getInfections')
	socket.emit('getPlayersHands')
	canvas.style="display:block;"

	}
