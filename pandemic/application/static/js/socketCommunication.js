//CHECK MOVE TO NEIGHBOURING CITY
socket = io.connect('http://' + document.domain + ':' + location.port);
function endOfRound(info){


    // in here will do all the front end work with the json string
    //alert("ROUND OVER CARDS AND INFECTIONS WILL NOW BE DONE");
//    if (info.epidemic==true){
//    //epidemic has been drawn so do epidemic front end stuff...
//    }
    //do some stuff
	console.log("info",info)
    for (var i=0;i<info.infections.length;i++){
        var cityName=info.infections[i].city;
        var amount=info.infections[i].amount;
        var colour= info.infections[i].colour;
        var path= info.infections[i].path;
        for (var x=0;x<amount;x++){
            //locations[cityName].infect({colour,infectionPath})
            console.log(path)
			if (path == undefined){
				locations[cityName].infect({'colour':colour});
			}else{
				pathing = []
				for (x in path){
					city=locations[path[x]];
					console.log(path[x])
					console.log(locations[path[x]])
					pathing.push({x:city.xPos,y:city.yPos})
				}
				city = locations[cityName]
				pathing.push({x:city.xPos,y:city.yPos})
				pathing.reverse()
				locations[cityName].infect({'colour':colour,'infectionPath':pathing});
			}

                }
     for (var player in info["cardDraw"]) {
		var cards=info["cardDraw"][player]
		for (var card in cards) {
			if (cards.hasOwnProperty(card)) {
			        if (player==thisPlayerName){
                    if (cards[card]=="epidemic"){
                        console.log("this is an epidemic card")
                    }
                    else{
					playersHand.addCard({cardName:cards[card]})
					}
					}

						  }
					 }
    }
}


    socket.emit('roundOverDone')



};

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

function checkMove(city){

    console.log("emitting move");
    socket.emit('checkMove', {cityName:city})

    };
socket.on('checked', function (data) {

        check=data.msg.validAction;
        var city=eval(data.city);
        if (data.msg.validAction ==true){
            if (isEmpty(data.msg.medicTreatments)==false){
            locations[data.msg.medicTreatments.cityName].disinfect({'colour':data.msg.medicTreatments.colour,'amount':data.msg.medicTreatments.amount});
            }
			player = players.players[data.playerName]
			player.move(city.xPos,city.yPos);
			console.log(player)
			locations[player.currentCity].removePlayer({playerName:data.playerName})
			locations[data.city].addPlayer({playerName:data.playerName})
			player.currentCity = data.city
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
//socket.on('directFlightChecked', function (data) {
//        //alert(data.msg);
//        check=data.msg.validAction;
//        var city=eval(data.city);
//        if (check ==true){
//            players.players[data.playerName].move(city.xPos,city.yPos);
//	    }
//	    else{
//	    alert(data.msg.errorMessage);
//	    }
//
//	    if (data.msg.endRound==true){
//            endOfRound(data.msg);
//
//        }
//});



function charterFlight() {

    var cityCard = prompt("Enter name of card you would like to use");
    var citytoMoveTo = prompt("Enter name of city you would like to move to");
    socket.emit('checkCharterFlight', {cityName:cityCard,destination:citytoMoveTo})

}
//socket.on('charterFlightChecked', function (data) {
//        //alert(data.msg);
//        check=data.msg.validAction;
//
//
//        if (check ==true){
//            var city=eval(data.city);
//            players.players[data.playerName].move(city.xPos,city.yPos);
//            // player.move(city.xPos,city.yPos);
//	    }
//	    else{
//	        alert(data.msg.errorMessage);
//	    }
//
//	    if (data.msg.endRound==true){
//            endOfRound(data.msg);
//
//        }
//
// });


function shuttleFlight() {

    var city = prompt("Enter name of city with research station you would like to move to");
    socket.emit('checkShuttleFlight', {cityName:city})

}

//socket.on('shuttleFlightChecked', function (data) {
//        //alert(data.msg);
//        check=data.msg.validAction;
//
//        if (check ==true){
//            var city=eval(data.city);
//             players.players[data.playerName].move(city.xPos,city.yPos);
//	    }
//	    else{
//	        alert(data.msg.errorMessage);
//	    }
//	    if (data.msg.endRound==true){
//            endOfRound(data.msg);
//
//        }
//});



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

    var colour = prompt("Enter colour of infection you wish to treat: ");
    socket.emit('treatDisease', {InfectionColour:colour})

}

socket.on('diseaseTreated', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;
        var colour= data.msg.colourTreated

        if (check ==true){
            var city=eval(data.city);
            //addResearchStation(city);
			locations[data.city].disinfect({'colour':colour,'amount':data.msg.amount});
	}
	else{
	    alert(data.msg.errorMessage);
	}

	if (data.msg.endRound==true){
            endOfRound(data.msg);

        }

    });


function discoverCure() {

    if (thisPlayerRole!="scientist"){

    var card1 = prompt("Enter City name: ");
    var card2 = prompt("Enter City name: ");
    var card3 = prompt("Enter City name: ");
    var card4 = prompt("Enter City name: ");
    var card5 = prompt("Enter City name: ");
    socket.emit('discoverCure', {cities:[card1,card2,card3,card4,card5]})
    }
    else{
    var card1 = prompt("Enter City name: ");
    var card2 = prompt("Enter City name: ");
    var card3 = prompt("Enter City name: ");
    var card4 = prompt("Enter City name: ");
    socket.emit('discoverCure', {cities:[card1,card2,card3,card4]})

    }


}

socket.on('cureDiscovered', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;
        var city=eval(data.city);
        if (check ==true){
            //addResearchStation(city);
            alert("A cure has been discovered!")
            playersHand.removeCard
            for (var card in data.cardsToDiscard) {
			if (cards.hasOwnProperty(card)) {
				if (data.playerName==player){
					playersHand.removeCard({cardName:data.cardsToDiscard[card]})
				}
						  }
					 }
	}
	else{
	    alert(data.msg.errorMessage);
	}

	if (data.msg.endRound==true){
            endOfRound(data.msg);

        }


    });

function discardCard(){

    var card = prompt("Enter name of card you wish to discard: ");
    socket.emit('discardCard', {cardName:card})

    }


socket.on('cardRemoved', function (data) {
        check=data.msg;
        if (check == true){
        console.log(data.cardToRemove+" has been discarded from your hand")
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

function PlayEventCard(){

    var cardName = prompt("Enter Name of event Card you want to play: ");
    if (cardName=="Government Grant"){
        var cityName = prompt("Enter Name of city you want to build a research station on: ");
        socket.emit('PlayEventCard',{card:cardName,city:cityName});
    }
    else if (cardName=="Airlift"){
        var playerName = prompt("Enter Name of player you wish to move: ");
        var cityName= prompt("Enter Name of city you wish to move player to: ");
        socket.emit('PlayEventCard',{card:cardName,player:playerName,city:cityName});

    }

    else if (cardName=="One Quiet Night"){
        socket.emit('PlayEventCard',{card:cardName,player:playerName});

    }

    else if (cardName=="Resilient Population"){
        var infectCardName= prompt("Enter Name of infect card in the discard pile you wish to remove from the game: ");
        socket.emit('PlayEventCard',{card:cardName,player:playerName,infectCard:infectCardName});

    }

    else{
    socket.emit('PlayEventCard',{card:cardName});
    }



}

socket.on('governmentGrantChecked', function (data) {

        check=data.msg.validAction;
        if (check==true){
            alert("research station built with event card")
            // here goes logic to draw the building
        }
        else{
            alert(data.msg.errorMessage);
        }
    });


//
//socket.on('airliftChecked', function (data) {
//
//        check=data.msg.validAction;
//
//        if (check ==true){
//            var city=eval(data.city);
//             players.players[data.playerName].move(city.xPos,city.yPos);
//	    }
//	    else{
//	        alert(data.msg.errorMessage);
//	    }
//    });

socket.on('oneQuietNightChecked', function (data) {

        check=data.msg.validAction;

        if (check ==true){
            alert("next infect cities will be skipped")
	    }
	    else{
	        alert(data.msg.errorMessage);
	    }
    });

socket.on('resilientPopulationChecked', function (data) {

        check=data.msg.validAction;
        if (check ==true){
            alert("Card has been removed from the game")
	    }
	    else{
	        alert(data.msg.errorMessage);
	    }
    });

function dispatcherMove(){

    var playerName = prompt("Enter Name of player you wish to move: ");
    var cityName= prompt("Enter Name of city you wish to move player to: ");
    socket.emit('dispatcherMove',{player:playerName,city:cityName});

}

function operationExpert(){

    var cardName = prompt("Enter name of card you wish to discard: ");
    var citytoMoveTo= prompt("Enter name of city you wish to move to")
    socket.emit('operationExpert',{card:cardName,city:citytoMoveTo})


}





socket.on('clicked', function (data) {

        console.log(data.msg);

    });

	
	
socket.on('gotPlayer',function(data){

    thisPlayerRole=data.playerType
    //alert(thisPlayerRole);
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
	city.addPlayer({playerName:data.playerName})
	console.log("cityName",cityName)
	players.addPlayer({playerName:data.playerName,playerType:data.playerType,xPos:city.xPos,yPos:city.yPos,currentCity:cityName});
	console.log("playersName",players.players[data.playerName])
	
	playerPortraits.addPlayerPortrait({playerType:data.playerType});

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
	console.log(data)
	thisPlayerName=data.username;
	playerHandHTML = ""
    for (var player in data["playerhand"]) {
		console.log(player)
		console.log(data["playerhand"])
		console.log(data["playerhand"][player])
    // if (data.hasOwnProperty(player)) {
		var playerId = player
		var cards=data["playerhand"][player]
		console.log("Player "+playerId + "has the cards: ")
//		$('#cards').val($('#cards').val() + "player "+ player+" cards are:" + '\n');
        playerHandHTML = playerHandHTML + "<p class ='playerHand' id = '" + playerId + " ' >"
		for (var card in cards) {
			console.log(card);
			if (cards.hasOwnProperty(card)) {
				console.log(cards[card]);
				if (data.username==player){
					playersHand.addCard({cardName:cards[card]})
					
				}
			// if you want to access each individial card then get in here through cards[card]
			// if you want the list of player cards get it through just "cards"
            playerHandHTML = playerHandHTML + "<p> " + cards[card] + "</p>"
//			$('#cards').val($('#cards').val() +  + '\n');
						  }
					 }
					 playerHandHTML = playerHandHTML + "</p>"
        // }
    }
    document.getElementById("playerCards").innerHTML = playerHandHTML ;
 });
