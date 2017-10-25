var AirLift = new Image(); AirLift.src = 'static/images/Cards/special/AirLift.png';
var Epidemic = new Image(); Epidemic.src = 'static/images/Cards/special/EPIDEMIC.png';
var Forecast = new Image(); Forecast.src = 'static/images/Cards/special/FORECAST.png';
var Government_Grant = new Image(); Government_Grant.src = 'static/images/Cards/special/GOVERNMENT_GRANT.png';
var One_Quiet_Night = new Image(); One_Quiet_Night.src = 'static/images/Cards/special/ONE_QUIET_NIGHT.png';
var Resilent_Population = new Image(); Resilent_Population.src = 'static/images/Cards/special/RESILENT_POPULATION.png';


var possibleEventCards = {AirLift,Epidemic,Forecast,Government_Grant,One_Quiet_Night,Resilent_Population}


function eventCardViewer(options){
	this.context = options.context;
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	
	this.active = true;
	this.activeCard = 'AirLift';
	
	
	
	this.changeActiveCard = function (options){		
		this.activeCard = options.cardName
	}
	
	
	
	this.toggleActive = function(){
		this.active = !this.active
	}	
	
	this.click = function(options){		
		
		
	}
	
	
	this.render = function(){
		if (this.active){
			this.context.fillStyle="rgba(0, 0, 0, 0.8)";
			this.context.fillRect(0,0,optimalScreenWidth,optimalScreenHeight);
			this.context.fillStyle="white";
			this.context.fillRect(this.xPos,this.yPos+700,500,120)
			this.context.fillStyle = "black"
			this.context.fillRect(this.xPos+20,this.yPos+700+20,500-40,120-40)
			
			this.context.font="40px Verdana";
			this.context.fillStyle = 'white';
			this.context.fillText("Use Event Card",this.xPos+40,this.yPos+780);
			
			
			this.context.font = "40px Verdana"
			this.context.strokeStyle = 'red';//'green';
			this.context.strokeText('X',optimalScreenWidth-100,100);
			
			
		
			this.context.drawImage(
			possibleEventCards[this.activeCard], //image to use
			0, // x position to start clipping 
			0, // y position to start clipping
			200, //width of clipped image
			280, // height of clipped image
			this.xPos, //x position for image on canvas
			this.yPos, // y position for image on canvas
			500, // width of image to use 
			700); // height of image to use
		}	
		
	}	
}