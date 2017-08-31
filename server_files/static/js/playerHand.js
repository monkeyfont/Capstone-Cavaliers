var CardImage = new Image(); CardImage.src = 'static/images/infection-Cards.png';
var testCardImage = new Image(); testCardImage.src = 'static/images/infection-Front.png';

var allPossiblePlayerCards = {testCard:testCardImage}

function playerHand(){
	this.xPos = 960;
	this.yPos = 1080;
	this.cards = {};
	
	this.addCard = function (options){
		//options = {cardname:cardName}
		cardFront = allPossiblePlayerCards[options.cardName];
			newPlayerCard = new playerCard({
			id:"Infection player Card ",
			context: canvas.getContext("2d"),
			width: 584,
			height: 800,
			numberOfFrames: 1,
			ticksPerFrame: 1,
			xPos:1600,
			yPos:40,
			xScale:0.5,
			yScale:0.5,
			imageBack: CardImage,
			imageFront: cardFront
		});
		cardName = options.cardName+Object.keys(this.cards).length;
		this.cards[cardName] = newPlayerCard;
		this.cards[cardName].flipping = true;
		
	}
	this.removeCard = function (options){
		//options = {cardname:cardName}
	}
	this.render = function(){
		for(i in this.cards){
			this.cards[i].move (this.xPos,this.yPos)
			this.cards[i].render();
		}
		console.log(Object.keys(this.cards).length)
	}
}