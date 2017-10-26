function actionState(options){
	// console.log("-----------------------",thisPlayerName)
	// console.log(players)
	// console.log(players.players[thisPlayerName])
	this.possibleEventCards = [AirLift,Epidemic,Forecast,Government_Grant,One_Quiet_Night,Resilent_Population]
	this.players = locations[players.players[thisPlayerName].currentCity].players
	this.infectionColours = Object.keys(locations[players.players[thisPlayerName].currentCity].activeInfections())
	this.currentState = null;
	
	this.selectedCard = function(){
		// a card has been selected, can we use the current action?
		
	}
	this.selectedCity = function(cityName){
		// a city has been selected, can we use the current action?
	}
	this.playerChosen = function(player){
		// a player has been selected from the action bar, so either give or take them
	}
	
	this.playerAndCardChosen = function (options){
		// the researcher and a card have been chosen from the action bar so give or take them
	}
	
	this.colourChosen = function(colour){
		// a card has been chosen from the action bar so
		// needs to treat the particular colour
		
	}
	
	this.redefinePlayers = function (){
		this.players = locations[players.players[thisPlayerName].currentCity].players
		// delete this.players[thisPlayerName]
		
	}
	
	this.redefineColours = function(){
		this.infectionColours = Object.keys(locations[players.players[thisPlayerName].currentCity].activeInfections())
	}
	

	
	this.checkStateChange = function(options){
		
		if(this.currentState == "EventCard"){
			if (Object.keys(playersHand.activeCards).length == 1){
				for (i in playersHand.activeCards){
					if( i in this.possibleEventCards){
						eventCardViewer.changeActiveCard(i)
						eventCardViewer.toggleActive()
					}
				}
				
				
			}
		}
		// if(this.currentState == "Treat"){
						
			// treatDisease()					
		// }else 
		if(this.currentState == "Build"){
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
		this.checkStateChange()
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