function actionState(options){
	// console.log("-----------------------",thisPlayerName)
	// console.log(players)
	// console.log(players.players[thisPlayerName])
	this.players = locations[players.players[thisPlayerName].currentCity].players
	this.infectionColours = Object.keys(locations[players.players[thisPlayerName].currentCity].activeInfections())
	this.currentState = null;
	
	this.selectedCard = function(){
		playersHand.cards 
	}
	this.selectedCity = function(cityName){
		
	}
	this.playerChosen = function(player){
		
	}
	
	this.colourChosen = function(colour){
		
	}
	
	this.redefinePlayers = function (){
		this.players = locations[players.players[thisPlayerName].currentCity].players
		// delete this.players[thisPlayerName]
		
	}
	
	this.redefineColours = function(){
		this.infectionColours = Object.keys(locations[players.players[thisPlayerName].currentCity].activeInfections())
	}
	

	
	this.checkStateChange = function(options){
		if(this.currentState == "Treat"){
			//colour			
			treatDisease()					
		}else if(this.currentState == "Build"){
			buildResearch()
		}else if(this.currentState == "CharterFlight"){
			//city location
			charterFlight()
		}else if(this.currentState == "Cure"){
			//cards
			discoverCure()
		}else if(this.currentState == "DirectFlight"){
			//one card
			directFlight(city)
		}else if(this.currentState == "Give"){
			// playerName
			shareKnowledgeGive()
		}else if(this.currentState == "Pass"){
			PassTurn()
		}else if(this.currentState == "ShuttleFlight"){
			//city Name
			shuttleFlight()
		}else if(this.currentState == "Take"){
			// playerName
			shareKnowledgeTake()
		}
	}
	
	
	this.changeCurrentState = function(options){
		console.log("______________changed state_______________",options.newState)
		this.currentState = options.newState
		cards = playersHand.activeCards;
		if(this.currentState == "Treat"){
			//colour			
			treatDisease()					
		}else if(this.currentState == "Build"){
			buildResearch()
		}else if(this.currentState == "CharterFlight"){
			//city location
			charterFlight()
		}else if(this.currentState == "Cure"){
			//cards
			discoverCure()
		}else if(this.currentState == "DirectFlight"){
			//one card
			directFlight(city)
		}else if(this.currentState == "Give"){
			// playerName
			shareKnowledgeGive()
		}else if(this.currentState == "Pass"){
			PassTurn()
		}else if(this.currentState == "ShuttleFlight"){
			//city Name
			shuttleFlight()
		}else if(this.currentState == "Take"){
			// playerName
			shareKnowledgeTake()
		}

	}
	
}