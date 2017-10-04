
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

// console.log(canvas.getContext("2d").getScale())
console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
console.log("scale Size:"+scaleSize);




// window.addEventListener('resize',canvasResize);

// function canvasResize(){
	// context.scale(scaleSize,scaleSize);
	// canvas.width = optimalScreenWidth*scaleSize;
	// canvas.height = optimalScreenHeight*scaleSize;
	// console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
	// console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
	// console.log("scale Size:"+scaleSize);
// }


var cardNumber = 0;
var socket;


socket = io.connect('http://' + document.domain + ':' + location.port);
//-------------------------PLAYER ACTIONS WEB SOCKET FUNCTIONS----------------
function endOfRound(info){

// in here will do all the front end work with the json string
alert("ROUND OVER CARDS AND INFECTIONS WILL NOW BE DONE");
console.log(info);
//do some stuff
socket.emit('roundOverDone')



};

//CHECK MOVE TO NEIGHBOURING CITY
function checkMove(city){

    console.log("emitting move");
    socket.emit('checkMove', {cityName:city})

    };
socket.on('checked', function (data) {

        check=data.msg.validAction;
        var city=eval(data.city);
        if (data.msg.validAction ==true){
			players.players[data.playerName].move(city.xPos,city.yPos);
	    }
	    else{
	    alert(data.msg.errorMessage);
	}
	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }

});

function directFlight(city) {

    var city = prompt("Enter name of city card in your hand you would like to move to");
    socket.emit('checkDirectFlight', {cityName:city})
}
socket.on('directFlightChecked', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;
        var city=eval(data.city);
        if (check ==true){
            players.players[data.playerName].move(city.xPos,city.yPos);
	    }
	    else{
	    alert(data.msg.errorMessage);
	    }

	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }
});



function charterFlight() {

    var cityCard = prompt("Enter name of card you would like to use");
    var citytoMoveTo = prompt("Enter name of city you would like to move to");
    socket.emit('checkCharterFlight', {cityName:cityCard,destination:citytoMoveTo})

}
socket.on('charterFlightChecked', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;


        if (check ==true){
            var city=eval(data.city);
            players.players[data.playerName].move(city.xPos,city.yPos);
            // player.move(city.xPos,city.yPos);
	    }
	    else{
	        alert(data.msg.errorMessage);
	    }

	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }

 });


function shuttleFlight() {

    var city = prompt("Enter name of city with research station you would like to move to");
    socket.emit('checkShuttleFlight', {cityName:city})

}

socket.on('shuttleFlightChecked', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;

        if (check ==true){
            var city=eval(data.city);
             players.players[data.playerName].move(city.xPos,city.yPos);
	    }
	    else{
	        alert(data.msg.errorMessage);
	    }
	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }
});



function buildResearch() {
    //var city = prompt("Enter current city Name: ");
    socket.emit('buildResearchStation', {})

}

socket.on('researchBuildChecked', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;

        if (check ==true){
            var city=eval(data.city);
            //addResearchStation(city);
            console.log("Research station HAS BEEEN built here")
	    }
	    else{

	        alert(data.msg.errorMessage);
	    }
	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }
});

function shareKnowledgeGive() {

    var city = prompt("Enter card you wish to swap: ");
    var otherPlayer = prompt("Enter name of player you want to swap with: ");
    socket.emit('shareKnowledgeGive', {cityName:city,playerTaking:otherPlayer})

}

socket.on('giveKnowledgeShared', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;
        if (check ==true){
            //addResearchStation(city);

            j=players
            JSON.stringify(j);
            console.log(j)
            console.log("Cards have been swapped")
	    }
	    else{
	        alert(data.msg.errorMessage);
	    }
	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }


    });


function shareKnowledgeTake() {

    var city = prompt("Enter card you wish to take: ");
    var otherPlayer = prompt("Enter name of player's card you want to take: ");
    socket.emit('shareKnowledgeTake', {cityName:city,playerGiving:otherPlayer})

}

socket.on('takeKnowledgeShared', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;
        if (check ==true){
            //addResearchStation(city);

            j=players
            JSON.stringify(j);
            console.log(j)
            console.log("Cards have been swapped")
	    }
	    else{

	        alert(data.msg.errorMessage);
	    }
	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }

    });

function treatDisease() {


    //console.log(city.activeInfections());
    var colour = prompt("Enter colour of infection you wish to treat: ");



    socket.emit('treatDisease', {InfectionColour:colour})

}

socket.on('diseaseTreated', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;
        var colour= data.msg.colourTreated

        if (check ==true){
            var city=eval(data.city);
			locations[data.city].disinfect({'colour':colour,'amount':1});


	}
	else{
	    alert(data.msg.errorMessage);
	}

	if (data.msg.endRound==true){
            endOfRound(data.msg);

        }

    });


function discoverCure() {

    var city = prompt("Enter current city Name: ");
    socket.emit('discoverCure', {cityName:city})

}

socket.on('cureDiscovered', function (data) {
        //alert(data.msg);
        check=data.msg;
        var city=eval(data.city);
        if (check ==true){
            //addResearchStation(city);
            console.log("Cure has been discovered")
	}
	else{
	    console.log("Sorry cure was not discovered");
	}

    });

function discardCard(){

    var card = prompt("Enter name of card you wish to discard: ");
    socket.emit('discardCard', {cardName:card})

}

socket.on('cardRemoved', function (data) {
        check=data.msg;
        if (check == true){
        alert(data.cardToRemove+" has been discarded from your hand")
        }
        else{
        alert("cannot discard this card")
        }


    });

function PassTurn(){

    socket.emit('PassTurn');

}

socket.on('passTurnChecked', function (data) {

        check=data.msg.validAction;
        if (check == true){
        console.log("turn passed no more actions left")
        }
        else{
        alert(data.msg.errorMessage);
        }

        if (data.msg.endRound==true){
            endOfRound(data.msg);

        }


    });



socket.on('clicked', function (data) {

        console.log(data.msg);

    });

var playerImage = new Image();
playerImage.src = 'static/images/player6.png';
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
	
	playerActionsMenu.render()
	
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

socket.on('gotPlayer',function(data){
	//console.log('data is: ',data )
	//console.log("you are the player",data.playerName);
	//console.log("you are the player",data.playerType);
	// players.addPlayer({playerName:data.playerName,playerType:data.playerType,xPos:ATLANTA.xPos,yPos:ATLANTA.yPos});
});

socket.on('gamePlayerInitilization',function(data){
	//console.log('data is: ',data )
	cityName = data.playerLocation;
	//console.log(locations[cityName]);
	city = locations[cityName]
	players.addPlayer({playerName:data.playerName,playerType:data.playerType,xPos:city.xPos,yPos:city.yPos});
});

socket.on('InfectedCities',function(data){

    var amount;

    //this is all just to loop through a json Object which is quite annoying
    for (var city in data) {
        if (data.hasOwnProperty(city)) {
             for (var colour in data[city]){
                if (data[city].hasOwnProperty(colour)) {
                amount=data[city][colour];
                // here loop through the amount which is number of times the city needs to be infected
                for (var x=0;x<amount;x++){
                // get the city from locations and infect it with karls .infect function
                locations[city].infect({colour})
                }
             }
        }
       }
       }
       });

socket.on('gotInitialHands',function(data){


    for (var player in data) {

    if (data.hasOwnProperty(player)) {
    var playerId= player
    var cards=data[player]
    //console.log("Player "+playerId + "has the cards: ")
    $('#cards').val($('#cards').val() + "player "+ player+" cards are:" + '\n');

    for (var card in cards) {

    if (cards.hasOwnProperty(card)) {

    // if you want to access each individial card then get in here through cards[card]
    // if you want the list of player cards get it through just "cards"

    $('#cards').val($('#cards').val() + cards[card] + '\n');
                  }
             }
        }
    }
 });





socket.on('clicked', function (data) {

        //console.log(data.msg);

    });


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


playerActionsMenu = new playerActionsBar({
	context: canvas.getContext("2d"),
	height: 400,
	width: 1920,
	yPos: 1080
	
	
})


window.onload = function (){
	socket.emit('getPlayerObject') 
	socket.emit('getGameInitialization')
	socket.emit('getInfections')
	socket.emit('getPlayersHands')

	}
