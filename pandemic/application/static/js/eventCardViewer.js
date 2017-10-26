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
	this.showPlayerSelection = false;
	this.active = true;
	this.activeCard = 'AirLift';
	
	
	
	this.changeActiveCard = function (options){		
		this.activeCard = options.cardName
	}
	
	
	
	this.toggleActive = function(){
		this.active = !this.active
		this.showPlayerSelection = false
	}	
	
	this.click = function(options){		
	
		xPos = options.x;
		yPos = options.y;
		
		if(xPos >=optimalScreenWidth-100 && xPos <= optimalScreenWidth-100+40
		&& yPos >= 100-40 && yPos <= 100 && this.active){
			console.log("close the discard viewer")
			this.toggleActive({})
		}
		
		
		if(this.active && xPos>= this.xPos+20 && xPos <=  this.xPos + 500-20 && yPos>= this.yPos+700+20&& yPos <= this.yPos+700+20+120-20){
			console.log("clicked to use the card")
			
			
			if (this.activeCard == "AirLift"){
				this.showPlayerSelection = true;
				// show a menu with player names
				
			}else{
				actionState.changeCurrentState({newState:this.activeCard})
				this.toggleActive()
			}
			return true
		}	
			if (this.showPlayerSelection && this.active){
				console.log("we are showing the player selection")
				numberOfPlayers = Object.keys(players.players).length
				xShow = this.xPos+500				
				yShow = this.yPos+700-(60*numberOfPlayers)
				// console.log(xShow,yShow)
				// console.log((xPos >= xShow && xPos <= xShow+400 && yPos >= yShow && yPos <= yShow+60*numberOfPlayers ))
				if (xPos >= xShow && xPos <= xShow+400 && yPos >= yShow && yPos <= yShow+60*numberOfPlayers ){
					console.log("interacting with the players")
					
					chosenPosition = Math.floor((yPos - yShow )/60)					
					console.log(chosenPosition)	
						chosenPlayer = 'none'
						console.log("these are the games players",players.players)
						for ( i in players.players){
							pos = Object.keys(players.players).indexOf(i)
							if (pos == chosenPosition){
								chosenPlayer = i;
								break
							}
						}
						console.log("the chosen player:",chosenPlayer)
						actionState.changeCurrentState({newState:this.activeCard,player:chosenPlayer})
						this.toggleActive();
						console.log(chosenPlayer)
						
					
					
					
				}
				
			return true
				
			}
			
			
			
			// PlayEventCard(this.activeCard)
			
		
		
		// 
		
		
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
			
			if (this.showPlayerSelection){
				// console.log("show me the players")
				numberOfPlayers = Object.keys(players.players).length
				// console.log(numberOfPlayers," players in the game")
				this.context.fillStyle = "rgba(0,0,0,.6)";
				this.context.fillRect(this.xPos+500,this.yPos+700-(60*numberOfPlayers),400,60*numberOfPlayers);
				writePosY = this.yPos+700-(60*numberOfPlayers)-15
				writePosX = this.xPos+500+20
				for(i in  players.players){
					writePosY = writePosY + 60
					this.context.font = "40px Sans-serif"
					this.context.strokeStyle = 'black';//'green';
					this.context.lineWidth = 8;
					this.context.lineJoin="round"; //Experiment with "miter" & "bevel" & "round" for the effect you want!
					this.context.miterLimit=3;

					this.context.strokeText(players.players[i].id,writePosX,writePosY);
					this.context.fillStyle = 'white';//this.colour;

					this.context.fillText(players.players[i].id,writePosX,writePosY);
				}
			}
			
		}	
		
	}	
}