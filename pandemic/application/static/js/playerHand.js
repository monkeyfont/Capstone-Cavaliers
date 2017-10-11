var CardImage = new Image(); CardImage.src = 'static/images/infection-Cards.png';
var testCardImage = new Image(); testCardImage.src = 'static/images/infection-Front.png';

var SANFRANCISCO = new Image(); SANFRANCISCO.src = 'static/images/Cards/player/Blue/San Francisco.png';
var CHICAGO = new Image();  CHICAGO.src = 'static/images/Cards/player/Blue/Chicago.png';
var MONTREAL = new Image();  MONTREAL.src = 'static/images/Cards/player/Blue/Montreal.png';
var NEWYORK = new Image();  NEWYORK.src = 'static/images/Cards/player/Blue/New York.png';
var ATLANTA = new Image();  ATLANTA.src =  'static/images/infection-Cards.png'; //'static/images/Cards/player/Blue/Atlanta.png';
var WASHINGTON = new Image();  WASHINGTON.src = 'static/images/Cards/player/Blue/Washington.png';
var LONDON = new Image();  LONDON.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Blue/London.png';
var ESSEN = new Image();  ESSEN.src = 'static/images/Cards/player/Blue/Essen.png';
var STPETERSBURG = new Image();  STPETERSBURG.src = 'static/images/Cards/player/Blue/ST. Petersburg.png';
var MADRID = new Image();  MADRID.src = 'static/images/Cards/player/Blue/Madrid.png';
var PARIS = new Image();  PARIS.src = 'static/images/Cards/player/Blue/Paris.png';
var MILAN = new Image();  MILAN.src = 'static/images/Cards/player/Blue/Milan.png';

var LOSANGELES = new Image(); LOSANGELES.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Yellow/
var MEXICOCITY = new Image();  MEXICOCITY.src = 'static/images/Cards/player/Yellow/Mexico City.png';
var MIAMI = new Image();  MIAMI.src = 'static/images/Cards/player/Yellow/Miami.png';
var BOGOTA = new Image();  BOGOTA.src = 'static/images/Cards/player/Yellow/Bogota.png';
var LIMA = new Image();  LIMA.src = 'static/images/Cards/player/Yellow/Lima.png';
var SANTIAGO = new Image();  SANTIAGO.src = 'static/images/Cards/player/Yellow/Santiago.png';
var BUENOSAIRES = new Image();  BUENOSAIRES.src = 'static/images/Cards/player/Yellow/Buenos Aires.png';
var SAOPAULO = new Image();  SAOPAULO.src = 'static/images/Cards/player/Yellow/Sao Paulo.png';
var LAGOS = new Image();  LAGOS.src = 'static/images/Cards/player/Yellow/Lagos.png';
var KHARTOUM = new Image();  KHARTOUM.src = 'static/images/Cards/player/Yellow/Khartoum.png';
var KINSHASA = new Image(); KINSHASA.src = 'static/images/Cards/player/Yellow/Kinshasa.png';
var JOHANNESBURG = new Image();  JOHANNESBURG.src = 'static/images/Cards/player/Yellow/Johannesburg.png';

var SYDNEY = new Image();  SYDNEY.src = 'static/images/Cards/player/Red/Sydney.png';
var JAKARTA = new Image(); JAKARTA.src = 'static/images/Cards/player/Red/Jakarta.png';
var MANILA = new Image();  MANILA.src = 'static/images/Cards/player/Red/Manila.png';
var HOCHIMINHCITY = new Image(); HOCHIMINHCITY.src = 'static/images/Cards/player/Red/Ho Chi Minh City.png';
var BANGKOK = new Image(); BANGKOK.src = 'static/images/Cards/player/Red/Bangkok.png';
var TAIPEI = new Image(); TAIPEI.src = 'static/images/Cards/player/Red/Taipei.png';
var OSAKA = new Image();  OSAKA.src = 'static/images/Cards/player/Red/Osaka.png';
var TOKYO = new Image();  TOKYO.src = 'static/images/Cards/player/Red/Tokyo.png';
var HONGKONG = new Image();  HONGKONG.src = 'static/images/Cards/player/Red/Hong Kong.png';
var SHANGHAI = new Image(); SHANGHAI.src = 'static/images/Cards/player/Red/Shanghai.png';
var SEOUL = new Image();  SEOUL.src = 'static/images/Cards/player/Red/Seoul.png';
var BEIJING = new Image();  BEIJING.src = 'static/images/Cards/player/Red/Beijing.png';

var KOULKATA = new Image(); KOULKATA.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Black/
var CHENNAI = new Image();  CHENNAI.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Black/
var DELHI = new Image();  DELHI.src = 'static/images/Cards/player/Black/Delhi.png'
var MUMBAI = new Image();  MUMBAI.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Black/
var KARACHI = new Image(); KARACHI.src = 'static/images/Cards/player/Black/Karachi.png'
var RIYADH = new Image();  RIYADH.src = 'static/images/Cards/player/Black/Riyadh.png'
var TEHRAN = new Image();  TEHRAN.src = 'static/images/Cards/player/Black/Tehran.png'
var MOSCOW = new Image();  MOSCOW.src = 'static/images/Cards/player/Black/Moscow.png'
var BAGHDAD = new Image(); BAGHDAD.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Black/
var CAIRO = new Image();  CAIRO.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Black/
var ISTANBUL = new Image();  ISTANBUL.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Black/
var ALGIERS = new Image(); ALGIERS.src = 'static/images/infection-Cards.png';//'static/images/Cards/player/Black/

var Airlift = new Image(); Airlift.src = 'static/images/Cards/special/Airlift.png';
var Epidemic = new Image(); Epidemic.src = 'static/images/Cards/special/Epidemic.png';
var Forecast = new Image(); Forecast.src = 'static/images/Cards/special/Forecast.png';
var Government_Grant = new Image(); Government_Grant.src = 'static/images/Cards/special/Government Grant.png';
var One_Quiet_Night = new Image(); One_Quiet_Night.src = 'static/images/Cards/special/One Quiet Night.png';
var Resilent_Population = new Image(); Resilent_Population.src = 'static/images/Cards/special/Resilent Population.png';

var allPossiblePlayerCards = {testCard:testCardImage,SANFRANCISCO,CHICAGO,MONTREAL,NEWYORK,ATLANTA,WASHINGTON,LONDON,ESSEN,STPETERSBURG,MADRID,PARIS,MILAN,
LOSANGELES,MEXICOCITY,MIAMI,BOGOTA,LIMA,SANTIAGO,BUENOSAIRES,SAOPAULO,LAGOS,KHARTOUM,KINSHASA,JOHANNESBURG,
SYDNEY,JAKARTA,MANILA,HOCHIMINHCITY,BANGKOK,TAIPEI,OSAKA,TOKYO,HONGKONG,SHANGHAI,SEOUL,BEIJING,
KOULKATA,CHENNAI,DELHI,MUMBAI,KARACHI,RIYADH,TEHRAN,MOSCOW,BAGHDAD,CAIRO,ISTANBUL,ALGIERS,Airlift,Epidemic,Forecast,Government_Grant,One_Quiet_Night,Resilent_Population}

function playerHand(){
	this.xPos = 960;
	this.yPos = 1080-100;

	this.cards = {};
	
	this.addCard = function (options){
		//options = {cardname:cardName}
		cardFront = allPossiblePlayerCards[options.cardName];
			newPlayerCard = new playerCard({
			id:"Infection player Card ",
			context: canvas.getContext("2d"),
			width: 500,
			height: 700,
			numberOfFrames: 1,
			ticksPerFrame: 1,
			xPos:1600,
			yPos:40,
			xScale:0.4,
			yScale:0.4,
			imageBack: CardImage,
			imageFront: cardFront
		});
		cardName = options.cardName;
		this.cards[cardName] = newPlayerCard;
		this.cards[cardName].flipping = true;		
	}
	
	this.cardX = function (options){
		if (options.y > this.yPos && options.y < this.yPos+40){
			console.log('discarding a card')
			startPoint = this.xPos-(Object.keys(this.cards).length)/2*(510*0.4)
			cardNumber = Math.floor((options.x-startPoint)/(510*0.4))
			xStart = (510*0.4*(cardNumber+1))+startPoint-40
			console.log('xstart:',xStart)
			if (options.x>xStart){
			console.log(cardNumber)
			chosenCard = 'none'
			for ( i in this.cards){
				pos = Object.keys(this.cards).indexOf(i)
				if (pos == cardNumber){
					chosenCard = i;
					break
				}
			}				
			console.log(chosenCard)
			socket.emit('discardCard', {cardName:chosenCard})
			this.removeCard({cardname:chosenCard})
			}
		}
		
	}
	
	
	this.removeCard = function (options){
		//options = {cardname:cardName}
		delete this.cards[options.cardname];
	}
	this.render = function(){
		startPoint = this.xPos-(Object.keys(this.cards).length)/2*(510*0.4)
		pos = 0;
		for(i in this.cards){
			this.cards[i].move (startPoint+510*0.4*pos,this.yPos)
			this.cards[i].render();
			pos++;
		}
		// console.log((Object.keys(this.cards).length)/2)
	}
}