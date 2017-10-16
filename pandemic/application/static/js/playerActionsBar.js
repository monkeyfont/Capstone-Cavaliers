
var Build = new Image(); Build.src = 'static/images/ActionIcons/Build.png';
var CharterFlight = new Image(); CharterFlight.src = 'static/images/ActionIcons/Charter Flight.png';
var Cure = new Image(); Cure.src = 'static/images/ActionIcons/Cure.png';
var DirectFlight = new Image(); DirectFlight.src = 'static/images/ActionIcons/Direct Flight.png';
var Give = new Image(); Give.src = 'static/images/ActionIcons/Give.png';
var Move = new Image(); Move.src = 'static/images/ActionIcons/Move.png';
var Pass = new Image(); Pass.src = 'static/images/ActionIcons/Pass.png';
var Share = new Image(); Share.src = 'static/images/ActionIcons/Share.png';
var ShuttleFlight = new Image(); ShuttleFlight.src = 'static/images/ActionIcons/Shuttle Flight.png';
var Take = new Image(); Take.src = 'static/images/ActionIcons/Take.png';
var Treat = new Image(); Treat.src = 'static/images/ActionIcons/Treat.png';

actions = {Build,CharterFlight,Cure,DirectFlight,Give,Move,Pass,Share,ShuttleFlight,Take,Treat};

//if (playerRole=="operationsExpert"){
//    actions = {Build,CharterFlight,Cure,DirectFlight,Give,Move,Pass,Share,ShuttleFlight,Take,Treat,OperationMove};
//}
//else if (playerRole=="dispatcher"){
//    actions = {Build,CharterFlight,Cure,DirectFlight,Give,Move,Pass,Share,ShuttleFlight,Take,Treat,DispatcherMove};
//}
//else{
//    actions = {Build,CharterFlight,Cure,DirectFlight,Give,Move,Pass,Share,ShuttleFlight,Take,Treat};
//}

actions = {Build,CharterFlight,Cure,DirectFlight,Give,Move,Pass,Share,ShuttleFlight,Take,Treat};



function playerActionsBar(options){
	this.context = options.context;
	this.height = options.height;
	this.width = options.width;	
	this.yPos = options.yPos;
	this.iconPosX = 200;
	this.iconPosY = this.yPos+50;
	this.iconScale = 1.5;
	this.iconWidth = 70;
	this.iconHeight = 90;
	
	this.activateAction = function(options){
		xPos = options.x;
		yPos = options.y;
		if (xPos>0 && xPos < this.width && yPos > this.yPos && yPos < this.yPos+this.width){
			if (yPos>this.iconPosY && yPos<this.iconPosY+(this.iconHeight*this.iconScale)){
				console.log('checking',xPos,yPos)
				position = Math.floor((xPos - this.iconPosX)/(this.iconWidth*this.iconScale))
				console.log('position', position)
				chosenAction = 'none'
				for ( i in actions){
					pos = Object.keys(actions).indexOf(i)
					if (pos == position){
						chosenAction = i;
						break
					}
				}				
				console.log('chosen action is: ',chosenAction)
				if(chosenAction == "Treat"){
					treatDisease()
				}else if(chosenAction == "Build"){
					buildResearch()
				}else if(chosenAction == "CharterFlight"){
					charterFlight()
				}else if(chosenAction == "Cure"){
					discoverCure()
				}else if(chosenAction == "DirectFlight"){
					directFlight(city)
				}else if(chosenAction == "Give"){
					shareKnowledgeGive()
				}else if(chosenAction == "Pass"){
					PassTurn()
				}else if(chosenAction == "ShuttleFlight"){
					shuttleFlight()
				}else if(chosenAction == "Take"){
					shareKnowledgeTake()
				}
				
			}	
		}
		
	}
	
	
	this.render = function(){
		this.context.beginPath();
		this.context.moveTo(0, this.yPos);
		this.context.lineTo(this.width-200,this.yPos);
		this.context.quadraticCurveTo(this.width,this.yPos,this.width,this.yPos+200);
		this.context.lineTo(this.width,this.yPos+this.height);
		this.context.lineTo(0,this.yPos+this.height);
		this.context.closePath();
		this.context.lineWidth=20;
		this.context.fillStyle = '#1b293f';
		this.context.fill();
		this.context.strokeStyle = '#18253a';
		this.context.stroke();
		for ( i in actions){
			pos = Object.keys(actions).indexOf(i)
			// console.log(i)
			this.context.drawImage(			
			actions[i], //image to use
			0, // x position to start clipping 
			0, // y position to start clipping
			this.iconWidth, //width of clipped image
			this.iconHeight, // height of clipped image
			this.iconPosX+ this.iconWidth*this.iconScale*pos, //x position for image on canvas
			this.iconPosY, // y position for image on canvas
			this.iconWidth*this.iconScale, // width of image to use 
			this.iconHeight*this.iconScale); // height of image to use
			
			
			
		}
		

	}
}