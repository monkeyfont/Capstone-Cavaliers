// var playerViewImage = new Image(); playerViewImage.src = 'static/images/Medic.png';	
var contingencyPlannerPortrait = new Image(); contingencyPlannerPortrait.src = 'static/images/PlayerPortraits/Contingency Planner.png';	
var dispatcherPortrait = new Image(); dispatcherPortrait.src = 'static/images/PlayerPortraits/Dispatcher.png';	
var medicPortrait = new Image(); medicPortrait.src = 'static/images/PlayerPortraits/Medic.png';	
var operationsExpertPortrait = new Image(); operationsExpertPortrait.src = 'static/images/PlayerPortraits/Operations Expert.png';	
var quarantineSpecialistPortrait = new Image(); quarantineSpecialistPortrait.src = 'static/images/PlayerPortraits/Quarantine Specialist.png';	
var researcherPortrait = new Image(); researcherPortrait.src = 'static/images/PlayerPortraits/Researcher.png';	
var scientistPortrait = new Image(); scientistPortrait.src = 'static/images/PlayerPortraits/Scientist.png';	

playerRoles = {contingencyPlannerPortrait,dispatcherPortrait,medicPortrait,operationsExpertPortrait,quarantineSpecialistPortrait,researcherPortrait,scientistPortrait}
function portraitInitilization(options){
	this.xPos = 2560 
	this.yPos = 20
	this.playerPortraits = {}
	this.addPlayerPortrait = function(options){
		this.playerPortraits[options.playerType]=new portrait({
			id:"playerViewImage",
			xPos:this.xPos-(420*0.5),
			yPos:this.yPos,
			xScale:0.5,
			yScale:0.5,
			height:340,
			width:400,
			image:playerRoles[options.playerType+"Portrait"],
			context: canvas.getContext("2d")
		});
		this.xPos = this.xPos-(420*0.5)
	}
	
	this.render = function(){
		for( i in this.playerPortraits){
			this.playerPortraits[i].render();
		}
		
	}
	
	
	
	
	
	
	
	
	
	
}