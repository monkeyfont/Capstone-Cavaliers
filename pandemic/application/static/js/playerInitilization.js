var contingencyPlanner = new Image(); contingencyPlanner.src = 'static/images/PlayerIcons/contingencyPlanner.png';
var dispatcher = new Image(); dispatcher.src = 'static/images/PlayerIcons/dispatcher.png';
var medic = new Image(); medic.src = 'static/images/PlayerIcons/medic.png';
var operationsExpert = new Image(); operationsExpert.src = 'static/images/PlayerIcons/operationsExpert.png';
var quarantineSpecialist = new Image(); quarantineSpecialist.src = 'static/images/PlayerIcons/quarantineSpecialist.png';
var researcher = new Image(); researcher.src = 'static/images/PlayerIcons/researcher.png';
var scientist = new Image(); scientist.src = 'static/images/PlayerIcons/scientist.png';


function playerInitilization (){
	this.players = {};
	
	this.addPlayer = function(options){
		console.log("adding new player",options.playerName)
		//options = {playerName:"player1",playerType="",xPos:200,yPos:200}
		if (options.playerType=="contingencyPlanner"){
			playerImage = contingencyPlanner;
		}else if (options.playerType=="dispatcher"){
			playerImage = dispatcher;
		}else if (options.playerType=="medic"){
			playerImage = medic;
		}else if (options.playerType=="operationsExpert"){
			playerImage = operationsExpert;
		}else if (options.playerType=="quarantineSpecialist"){
			playerImage = quarantineSpecialist;
		}else if (options.playerType=="researcher"){
			playerImage = researcher;
		}else if (options.playerType=="scientist"){
			playerImage = scientist;
		}else{
			console.log("invalid player type", options.playerType)
		}
		
		this.players[options.playerName] = new player({
			id:options.playerName +" "+ options.playerType,
			playerType:options.playerType,
			context: canvas.getContext("2d"),
			width: 256,
			height: 256,
			numberOfFrames: 4,
			ticksPerFrame: 16,
			xPos:options.xPos,
			yPos:options.yPos,
			xScale:0.2,
			yScale:0.2,
			image: playerImage,
			currentCity:options.currentCity			
		});
	}
	
	this.render = function(){
		// console.log("rendering players")
		for (i in this.players){
			// console.log(this.players[i])
			this.players[i].render()
		}
	}
	
}