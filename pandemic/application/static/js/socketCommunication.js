//CHECK MOVE TO NEIGHBOURING CITY
socket = io.connect('http://' + document.domain + ':' + location.port);
function endOfRound(info){


    // in here will do all the front end work with the json string
    //alert("ROUND OVER CARDS AND INFECTIONS WILL NOW BE DONE");
//    if (info.epidemic==true){
//    //epidemic has been drawn so do epidemic front end stuff...
//    }
    //do some stuff

    if (info["gameLoss"]==true){ // game is over !!!!

    //insert logic into here to deal with a game over situation.


    }



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


    // CUBE METER STUFF
    console.log(info["cubesUsed"])
    for (var i=0;i<info["cubesUsed"].length;i++){
        for (key in info["cubesUsed"][i]){
            infectionsMeterDisplay.alterInfectionStatus({colour:key,amount:info["cubesUsed"][i][key]})
            //infectionsMeterDisplay.alterInfectionStatus({colour:"yellow",amount:20})
            //{"amount":info["cubesUsed"][i][key]}
        }
    }

    //OUBREAK LEVEL STUFF

    var outbreakLevel;
    outbreakLevel= info["outBreakLevel"]
    outbreakCount.setStage({outbreakStage:outbreakLevel})

    // do whatever with that number


    //INFECTION RATE STUFF
    var infectionLevel;
    infectionLevel=info["infectionLevel"]
    infectRate.setStage({infectionStage:infectionLevel})
    // do front end stuff to update it


    // INFECTION DISCARDED

    console.log(info.infectionDiscarded)

    //update hands

        playerHandHTML="";
       for (var player in info["playerHandsUpdated"]) {
		playerCardInfo = {}
		playerCardInfo.playerName = player
		playerCardInfo.cards = []
		var playerId = player
		var cards=info["playerHandsUpdated"][player]

        playerHandHTML = playerHandHTML + "<div class = playerHand>"
        playerHandHTML = playerHandHTML + "<div class = playerSection>"
        playerHandHTML = playerHandHTML + "<p class = '" + playerRoll[player] + "' id = 'playerName'>" + playerId + "</p>"
        playerHandHTML = playerHandHTML + "<p id = '" + playerRoll[player] + "'>" + playerRoll[player] + "</p>"
        playerHandHTML = playerHandHTML + "</div>"
        for (var card in cards) {

			cardInfo = {}
			cardInfo.cardName = cards[card]
			try{
				cardInfo.colour = locations[cards[card]].colour
			}catch(err){
				cardInfo.colour = "none"
			}
			playerCardInfo.cards.push(cardInfo)
			if (cards.hasOwnProperty(card)) {

            playerHandHTML = playerHandHTML + "<p class = ' " +cardInfo.colour+ "'>" + cards[card] + "</p>"

						  }
					 }
			playerHandHTML = playerHandHTML + "</div>"

			playersHands.push(playerCardInfo)
        // }
    }
    $('#playerCards').empty();
	//actionState = new actionState({});
	//document.getElementById("playerCards").innerHTML = "HELLO" ;
    document.getElementById("playerCards").innerHTML = playerHandHTML ;



    

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

            if (data.cardName){
			playersHand.removeCard({cardname:data.cardName})
			}

	    }
	    else{
	    messageAlert.newMessage({message:data.msg.errorMessage})
	    //alert(data.msg.errorMessage);
	}
	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }

});

function directFlight(city) {

    socket.emit('checkDirectFlight', {cityName:city})
}



function charterFlight() {

     socket.emit('checkCharterFlight', {destination:city})

}



function shuttleFlight() {

    socket.emit('checkShuttleFlight', {cityName:city})

}


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
            locations[data.city].addResearchStation();
            playersHand.removeCard({cardname:data.cardName})
	    }
	    else{

	        alert(data.msg.errorMessage);
	    }
	    if (data.msg.endRound==true){
            endOfRound(data.msg);

        }
});

function shareKnowledgeGive(options) {


    if (thisPlayerRole=="researcher"){

        var city = prompt("Enter card you wish to swap: ");
        var otherPlayer = prompt("Enter name of player you want to swap with: ");
        socket.emit('shareKnowledgeGive', {cityName:city,playerTaking:otherPlayer})

    }
    else{
        var otherPlayer = prompt("Enter name of player you want to swap with: ");
        socket.emit('shareKnowledgeGive', {playerTaking:otherPlayer})
    }



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


function shareKnowledgeTake(options) {

    var otherPlayer = prompt("Enter name of player's card you want to take: ");
    var type= players.players[otherPlayer].playerType
    //alert(type)

    if (type=="researcher"){
        var city = prompt("Enter card you wish to take: ");
        socket.emit('shareKnowledgeTake', {cityName:city,playerGiving:otherPlayer})
        }
    else{

    socket.emit('shareKnowledgeTake', {playerGiving:otherPlayer})

    }



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

function treatDisease(options) {

    var res = options.colour;
    var colour = res.toLowerCase();
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


function discoverCure(options) {
	console.log(options)
	cardList = []

	for (i in options){
		cardList.push(options[i])
	}

    if (thisPlayerRole!="scientist"){

    socket.emit('discoverCure', {cities:cardList})
    }
    else{

    socket.emit('discoverCure', {cities:cardList})

    }


}

socket.on('cureDiscovered', function (data) {
        //alert(data.msg);
        check=data.msg.validAction;
        var city=eval(data.city);
        if (check ==true){

            cureBar.changeStatus({colour:data.msg.colourCured,status:'Discovered'})
            //addResearchStation(city);
            //alert("A cure has been discovered!")
            //alert(data.msg.colourCured)
            //playersHand.removeCard
            for (var card in data.cardsToDiscard) {
			if (data.cardsToDiscard.hasOwnProperty(card)) {
				if (data.playerName==thisPlayerName){
//				    alert(data.cardsToDiscard[card])
					playersHand.removeCard({cardname:data.cardsToDiscard[card]})
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

function PlayEventCard(options){
		cardName = options.cardName
    // var cardName = prompt("Enter Name of event Card you want to play: ");
    if (cardName=="Government_Grant"){
        var cityName = options.city;
		console.log("government grant not working",cardName,cityName)
        socket.emit('PlayEventCard',{card:cardName,city:cityName});
    }
    else if (cardName=="AirLift"){
        console.log("using airlift",cardName,options.player,options.city)
        //alert(cardName+" "+options.player+" "+options.city)
        socket.emit('PlayEventCard',{card:cardName,player:options.player,city:options.city});

    }

    else if (cardName=="One_Quiet_Night"){
        socket.emit('PlayEventCard',{card:cardName});

    }

    else if (cardName=="Resilient_Population"){
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
            //alert("research station built with event card")
            locations[data.msg.location].addResearchStation();
            playersHand.removeCard({cardname:"Government_Grant"})

            // here goes logic to draw the building
        }
        else{
            alert(data.msg.errorMessage);
        }
    });



socket.on('oneQuietNightChecked', function (data) {

        check=data.msg.validAction;

        if (check ==true){
            alert("next infect cities will be skipped")
            playersHand.removeCard({cardname:"One_Quiet_Night"})
	    }
	    else{
	        alert(data.msg.errorMessage);
	    }
    });

socket.on('resilientPopulationChecked', function (data) {

        check=data.msg.validAction;
        if (check ==true){
            //alert("Card has been removed from the game")

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
    for (var city in data.infected) {
        if (data.infected.hasOwnProperty(city)) {
             for (var colour in data.infected[city]){
                if (data.infected[city].hasOwnProperty(colour)) {
                amount=data.infected[city][colour];
                // here loop through the amount which is number of times the city needs to be infected
                for (var x=0;x<amount;x++){
                // get the city from locations and infect it with karls .infect function
                locations[city].infect({colour})
                }
             }
        }
       }
       }

       // research stations

//       console.log(data.researchLocations)
       for (var i=0;i<data.researchLocations.length;i++){
//            alert(data.researchLocations[i])
            locations[data.researchLocations[i]].addResearchStation();

       }



       //cures

       for (var i=0;i<data.curesFound.length;i++){
//            alert(data.researchLocations[i])
            cureBar.changeStatus({colour:data.curesFound[i],status:'Discovered'})


       }

        var outbreakLevel;
        outbreakLevel= data.outbreakLevel
        outbreakCount.setStage({outbreakStage:outbreakLevel})

        // do whatever with that number


        //INFECTION RATE STUFF
        var infectionLevel;
        infectionLevel=data.infectLevel
        infectRate.setStage({infectionStage:infectionLevel})
        // do front end stuff to update it
        console.log(data.cubesUsed)

        for (var i=0;i<data.cubesUsed.length;i++){
        for (key in data.cubesUsed[i]){
            infectionsMeterDisplay.alterInfectionStatus({colour:key,amount:data.cubesUsed[i][key]})
            //infectionsMeterDisplay.alterInfectionStatus({colour:"yellow",amount:20})
            //{"amount":info["cubesUsed"][i][key]}
        }
    }


       });

socket.on('gotInitialHands',function(data){

	thisPlayerName=data.username;
	researcherHand = {};

	playerRoll = data.playerRoll
	playerHandHTML = ""
	playersHands = []
	// playersHands = [{playername:"",cards:[{cardName:""colour:""},{cardName:""colour:""}]}
    for (var player in data["playerhand"]) {
		playerCardInfo = {}
		playerCardInfo.playerName = player
		playerCardInfo.cards = []
    // if (data.hasOwnProperty(player)) {
		var playerId = player
		// actionState.addPlayer({playerName:player})
		var cards=data["playerhand"][player]
		console.log("Player "+playerId + " has the cards: ")
//		$('#cards').val($('#cards').val() + "player "+ player+" cards are:" + '\n');
        playerHandHTML = playerHandHTML + "<div class = playerHand>"
        playerHandHTML = playerHandHTML + "<div class = playerSection>"
        playerHandHTML = playerHandHTML + "<p class = '" + playerRoll[player] + "' id = 'playerName'>" + playerId + "</p>"
        playerHandHTML = playerHandHTML + "<p id = '" + playerRoll[player] + "'>" + playerRoll[player] + "</p>"
        playerHandHTML = playerHandHTML + "</div>"

		for (var card in cards) {
			if (players.players[player].playerType == "researcher"){
				researcherHand[cards[card]] = cards[card]
				console.log("added ",cards[card]," to researchers hand. its now:",researcherHand)
			}
			
			console.log(card);
			cardInfo = {}
			cardInfo.cardName = cards[card]
			try{
				cardInfo.colour = locations[cards[card]].colour
			}catch(err){
				cardInfo.colour = "none"
			}
			playerCardInfo.cards.push(cardInfo)
			if (cards.hasOwnProperty(card)) {
				console.log(cards[card]);
				if (data.username==player){
					playersHand.addCard({cardName:cards[card]})
					
				}

            playerHandHTML = playerHandHTML + "<p class = ' " +cardInfo.colour+ "'>" + cards[card] + "</p>"

						  }
					 }
					  playerHandHTML = playerHandHTML + "</div>"

					 playersHands.push(playerCardInfo)
        // }
    }

	actionState = new actionState({});

    document.getElementById("playerCards").innerHTML = playerHandHTML ;

    function updateCards(){


                }
 });
