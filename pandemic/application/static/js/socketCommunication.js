//CHECK MOVE TO NEIGHBOURING CITY
socket = io.connect('http://' + document.domain + ':' + location.port);
function checkMove(city){

    console.log("emitting move");
    socket.emit('checkMove', {cityName:city})

    };
socket.on('checked', function (data) {
        check=data.msg;
        var city=eval(data.city);
        console.log(check+" "+ city)
        if (check ==true){
			console.log('moving',data.playerName)
			// console.log('player k',players.players.k)
			// console.log(players)
			players.players[data.playerName].move(city.xPos,city.yPos);
	}
	else{
	    console.log("Sorry invalid move");
	}
});

function directFlight(city) {

    var city = prompt("Enter name of city card in your hand you would like to move to");
    socket.emit('checkDirectFlight', {cityName:city})
}
socket.on('directFlightChecked', function (data) {
        //alert(data.msg);
        check=data.msg;
        var city=eval(data.city);
        console.log(check+" "+ city)
        if (check ==true){

            players.players[data.playerName].move(city.xPos,city.yPos);
	}
	else{
	    console.log("Sorry invalid move");
	}
});



function charterFlight() {

    var cityCard = prompt("Enter name of card you would like to use");
    var citytoMoveTo = prompt("Enter name of city you would like to move to");
    socket.emit('checkCharterFlight', {cityName:cityCard,destination:citytoMoveTo})

}
socket.on('charterFlightChecked', function (data) {
        //alert(data.msg);
        check=data.msg;
        var city=eval(data.city);

        if (check ==true){
        players.players[data.playerName].move(city.xPos,city.yPos);
            // player.move(city.xPos,city.yPos);
	}
	else{
	    console.log("Sorry invalid move");
	}
 });


function shuttleFlight() {

    var city = prompt("Enter name of city with research station you would like to move to");
    socket.emit('checkShuttleFlight', {cityName:city})

}

socket.on('shuttleFlightChecked', function (data) {
        //alert(data.msg);
        check=data.msg;
		console.log("data",data);
        var city=eval(data.city);
        console.log(check+" "+ city)
        if (check ==true){
             players.players[data.playerName].move(city.xPos,city.yPos);
	}
	else{
	    console.log("Sorry invalid move");
	}
});



function buildResearch() {
    var city = prompt("Enter current city Name: ");
    socket.emit('buildResearchStation', {cityName:city})

}

socket.on('researchBuildChecked', function (data) {
        //alert(data.msg);
        check=data.msg;
        var city=eval(data.city);
        if (check ==true){
            //addResearchStation(city);

            console.log("Research station can be built here")
	}
	else{

	    console.log("Sorry research station cannot be built here");
	}
});

function shareKnowledgeGive() {

    var city = prompt("Enter card you wish to swap: ");
    var otherPlayer = prompt("Enter name of player you want to swap with: ");
    socket.emit('shareKnowledgeGive', {cityName:city,playerTaking:otherPlayer})

}

socket.on('giveKnowledgeShared', function (data) {
        //alert(data.msg);
        check=data.msg;

        if (check ==true){
            //addResearchStation(city);

            j=players
            JSON.stringify(j);
            console.log(j)
            console.log("Cards have been swapped")
	}
	else{

	    console.log("Sorry cannot share this card to the other player");
	}

    });


function shareKnowledgeTake() {

    var city = prompt("Enter card you wish to take: ");
    var otherPlayer = prompt("Enter name of player's card you want to take: ");
    socket.emit('shareKnowledgeTake', {cityName:city,playerGiving:otherPlayer})

}

socket.on('takeKnowledgeShared', function (data) {
        //alert(data.msg);
        check=data.msg;

        if (check ==true){
            //addResearchStation(city);

            j=players
            JSON.stringify(j);
            console.log(j)
            console.log("Cards have been swapped")
	}
	else{

	    console.log("Sorry cannot share this card to the other player");
	}

    });

function treatDisease() {

    var city = prompt("Enter current city Name: ");
    socket.emit('treatDisease', {cityName:city})

}

socket.on('diseaseTreated', function (data) {
        //alert(data.msg);
        check=data.msg;
        var city=eval(data.city);
        if (check ==true){
            //addResearchStation(city);
			locations[data.city].disinfect({'colour':locations[data.city].colour,'ammount':1});
            console.log("Disease treated in ",data.city)

	}
	else{
	    console.log("Sorry cannot treat this disease");
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


socket.on('clicked', function (data) {

        console.log(data.msg);

    });
	
	
addPlayersCard = function(){
	playersHand.addCard({cardName:'testCard'});
}



moveInfection = function(){
	ATLANTA.infect({colour:'black',infectionPath:[{x:ATLANTA.xPos,y:ATLANTA.yPos},{x:CHICAGO.xPos,y:CHICAGO.yPos},{x:MONTREAL.xPos,y:MONTREAL.yPos}]});
	SANFRANCISCO.infect({colour:'black',infectionPath:[{x:SANFRANCISCO.xPos,y:SANFRANCISCO.yPos},{x:CHICAGO.xPos,y:CHICAGO.yPos},{x:MONTREAL.xPos,y:MONTREAL.yPos}]});
	ATLANTA.infect({colour:'black',infectionPath:[{x:ATLANTA.xPos,y:ATLANTA.yPos},{x:CHICAGO.xPos,y:CHICAGO.yPos},{x:MONTREAL.xPos,y:MONTREAL.yPos}]});
}


socket.on('gotPlayer',function(data){
	console.log('data is: ',data )
	console.log("you are the player",data.playerName);
	console.log("you are the player",data.playerType);
	// players.addPlayer({playerName:data.playerName,playerType:data.playerType,xPos:ATLANTA.xPos,yPos:ATLANTA.yPos});
});

socket.on('gamePlayerInitilization',function(data){
	console.log('data is: ',data )
	cityName = data.playerLocation;
	console.log(locations[cityName]);
	city = locations[cityName]
	players.addPlayer({playerName:data.playerName,playerType:data.playerType,xPos:city.xPos,yPos:city.yPos});
});

socket.on('intitialInfectedCities',function(data){

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
                locations[city].infect({})
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
    console.log("Player "+playerId + "has the cards: ")
    $('#cards').val($('#cards').val() + "player "+ player+" cards are:" + '\n');

    for (var card in cards) {

    if (cards.hasOwnProperty(card)) {

    // if you want to access each individial card then get in here through cards[card]
    // if you want the list of player cards get it through just "cards"
    console.log(cards[card])

    $('#cards').val($('#cards').val() + cards[card] + '\n');
                  }
             }
        }
    }
 });


socket.on('clicked', function (data) {

        console.log(data.msg);

    });

