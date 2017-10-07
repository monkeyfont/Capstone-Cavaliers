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


var allPossiblePlayerCards = {testCard:testCardImage,SANFRANCISCO,CHICAGO,MONTREAL,NEWYORK,ATLANTA,WASHINGTON,LONDON,ESSEN,STPETERSBURG,MADRID,PARIS,MILAN,
LOSANGELES,MEXICOCITY,MIAMI,BOGOTA,LIMA,SANTIAGO,BUENOSAIRES,SAOPAULO,LAGOS,KHARTOUM,KINSHASA,JOHANNESBURG,
SYDNEY,JAKARTA,MANILA,HOCHIMINHCITY,BANGKOK,TAIPEI,OSAKA,TOKYO,HONGKONG,SHANGHAI,SEOUL,BEIJING,
KOULKATA,CHENNAI,DELHI,MUMBAI,KARACHI,RIYADH,TEHRAN,MOSCOW,BAGHDAD,CAIRO,ISTANBUL,ALGIERS}

function playerHand(){
	this.xPos = 960;
	this.yPos = 1080-60;
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
		startPoint = 960-(Object.keys(this.cards).length)/2*(584*0.5)
		pos = 0;
		for(i in this.cards){
			this.cards[i].move (startPoint+584*0.5*pos,this.yPos)
			this.cards[i].render();
			pos++;
		}
		// console.log((Object.keys(this.cards).length)/2)
	}
}