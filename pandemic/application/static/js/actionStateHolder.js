function actionState(options){
	this.players = []
	this.infectionColours = ["red","yellow","black","blue"]
	this.currentState = null;
	
	
	this.checkStateChange = function(options){
		
	}
	
	this.addPlayer = function(options){
		this.players.push(options.playerName);
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