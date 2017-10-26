function actionState(options){
	// console.log("-----------------------",thisPlayerName)
	// console.log(players)
	// console.log(players.players[thisPlayerName])
	this.possibleEventCards = ["AirLift","Epidemic","Forecast","Government_Grant","One_Quiet_Night","Resilent_Population"]
	this.players = locations[players.players[thisPlayerName].currentCity].players
	this.infectionColours = Object.keys(locations[players.players[thisPlayerName].currentCity].activeInfections())
	this.currentState = null;
	this.playerInvolved = null;

	this.selectedCard = function(){
		// a card has been selected, can we use the current action?

	}
	this.selectedCity = function(cityName){
		console.log(" a city has been selected, can we use the current action?")
		if(this.currentState == "Government_Grant"){
			PlayEventCard({cardName:"Government_Grant",city:cityName})
		return true
		}else if(this.currentState == "AirLift"){
			console.log("wtf wtf wtf",this.playerInvolved,cityName)
			PlayEventCard({cardName:"AirLift",player:this.playerInvolved,city:cityName})
		return true
		}else if(this.currentState == "One_Quiet_Night"){


			PlayEventCard({cardName:"One_Quiet_Night"})
		return true
		}else if (this.currentState == "ShuttleFlight "){
			shuttleFlight(cityName)
			return true
		}else if (this.currentState == "CharterFlight"  ){
			charterFlight(cityName)
			// cityName
			return true
		}

		return false


	}
	this.playerChosen = function(player){
		// a player has been selected from the action bar, so either give or take them
	}

	this.playerAndCardChosen = function (options){
		console.log(options.card,options.researcherName)
		if(this.currentState == "Take"){
			shareKnowledgeTake({playerName:options.researcherName,card:options.card})
		}else if (this.currentState == "Give"){
			shareKnowledgeGive({playerName:options.researcherName,card:options.card})

		}
		// the researcher and a card have been chosen from the action bar so give or take them
	}

	this.colourChosen = function(colour){
		// a card has been chosen from the action bar so
		// needs to treat the particular colour

	}

	this.redefinePlayers = function (){
		this.players = locations[players.players[thisPlayerName].currentCity].players
		delete this.players[thisPlayerName]

	}

	this.redefineColours = function(){
		this.infectionColours = Object.keys(locations[players.players[thisPlayerName].currentCity].activeInfections())
	}



	this.checkStateChange = function(options){
		console.log("checking whether the state has changed")
		if(this.currentState == "EventCard"){
			console.log("we are in the eventcard state")
			if (Object.keys(playersHand.activeCards).length == 1){
				console.log("we have 1 card selected")
				for (i in playersHand.activeCards){
					console.log(i)
					console.log(i in this.possibleEventCards)
					console.log(this.possibleEventCards)
					if(this.possibleEventCards.includes(i)){
						console.log("changing the active card and turning event viewer on")
						eventCardViewer.changeActiveCard({cardName:i})
						eventCardViewer.toggleActive()
					}
				}


			}
		}
		// if(this.currentState == "Treat"){

			// treatDisease()
		// }else
		if(this.currentState == "Build"){
			// buildResearch()
		}else if(this.currentState == "CharterFlight"){
			//city location
			// charterFlight()
		}else if(this.currentState == "Cure"){
			//cards
			// discoverCure()
		}else if(this.currentState == "DirectFlight"){
			//one card
			// directFlighst(city)
		}else if(this.currentState == "Give"){
			// playerName
			// shareKnowledgeGive()
		}else if(this.currentState == "Pass"){
			PassTurn()
		}else if(this.currentState == "ShuttleFlight"){
			//city Name
			// shuttleFlight()
		}else if(this.currentState == "Take"){
			// playerName
			// shareKnowledgeTake()
		}
	}


	this.changeCurrentState = function(options){
		console.log("______________changed state_______________",options.newState,options.player,options.colour)
		this.playerInvolved = options.player
		this.currentState = options.newState
		cards = playersHand.activeCards;
		this.checkStateChange()
		if(this.currentState == "One_Quiet_Night"){


			PlayEventCard({cardName:"One_Quiet_Night"})
		return true

		}else if(this.currentState == "Treat"){
			treatDisease({colour:options.colour})
		}else if(this.currentState == "Build"){
			buildResearch()
		}else if(this.currentState == "CharterFlight"){
			//city location
			// charterFlight()
		}else if(this.currentState == "Cure"){
			if(Object.keys(playersHand.activeCards).length =5)
				discoverCure(playersHand.activeCards)
			else if (Object.keys(playersHand.activeCards).length =4 && players.players[thisPlayerName].playerType == "Scientist"){
				discoverCure(playersHand.activeCards)
			}
		}else if(this.currentState == "DirectFlight"){
			//one card
			if(Object.keys(playersHand.activeCards).length =1){
				for (i in playersHand.activeCards){
					directFlight(i)
				}

			}


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