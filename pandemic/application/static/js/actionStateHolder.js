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
		this.currentState = options.newState
	}
	
}