var CardImage = new Image(); CardImage.src = 'static/images/Cards/special/INFECTION_BACK.png';

var SANFRANCISCO = new Image(); SANFRANCISCO.src = 'static/images/Cards/infection/Blue/SAN_FRANCISCO.png';
var CHICAGO = new Image();  CHICAGO.src = 'static/images/Cards/infection/Blue/CHICAGO.png';
var MONTREAL = new Image();  MONTREAL.src = 'static/images/Cards/infection/Blue/MONTREAL.png';
var NEWYORK = new Image();  NEWYORK.src = 'static/images/Cards/infection/Blue/NEW_YORK.png';
var ATLANTA = new Image();  ATLANTA.src =  'static/images/Cards/infection/Blue/ATLANTA.png';
var WASHINGTON = new Image();  WASHINGTON.src = 'static/images/Cards/infection/Blue/WASHINGTON.png';
var LONDON = new Image();  LONDON.src = 'static/images/Cards/infection/Blue/LONDON.png';
var ESSEN = new Image();  ESSEN.src = 'static/images/Cards/infection/Blue/ESSEN.png';
var STPETERSBURG = new Image();  STPETERSBURG.src = 'static/images/Cards/infection/Blue/ST_PETERSBURG.png';
var MADRID = new Image();  MADRID.src = 'static/images/Cards/infection/Blue/MADRID.png';
var PARIS = new Image();  PARIS.src = 'static/images/Cards/infection/Blue/PARIS.png';
var MILAN = new Image();  MILAN.src = 'static/images/Cards/infection/Blue/MILAN.png';

var LOSANGELES = new Image(); LOSANGELES.src = 'static/images/Cards/infection/Yellow/LOS_ANGELES.png';
var MEXICOCITY = new Image();  MEXICOCITY.src = 'static/images/Cards/infection/Yellow/MEXICO_CITY.png';
var MIAMI = new Image();  MIAMI.src = 'static/images/Cards/infection/Yellow/MIAMI.png';
var BOGOTA = new Image();  BOGOTA.src = 'static/images/Cards/infection/Yellow/BOGOTA.png';
var LIMA = new Image();  LIMA.src = 'static/images/Cards/infection/Yellow/LIMA.png';
var SANTIAGO = new Image();  SANTIAGO.src = 'static/images/Cards/infection/Yellow/SANTIAGO.png';
var BUENOSAIRES = new Image();  BUENOSAIRES.src = 'static/images/Cards/infection/Yellow/BUENOS_AIRES.png';
var SAOPAULO = new Image();  SAOPAULO.src = 'static/images/Cards/infection/Yellow/SAO_PAULO.png';
var LAGOS = new Image();  LAGOS.src = 'static/images/Cards/infection/Yellow/LAGOS.png';
var KHARTOUM = new Image();  KHARTOUM.src = 'static/images/Cards/infection/Yellow/KHARTOUM.png';
var KINSHASA = new Image(); KINSHASA.src = 'static/images/Cards/infection/Yellow/KINSHASA.png';
var JOHANNESBURG = new Image();  JOHANNESBURG.src = 'static/images/Cards/infection/Yellow/JOHANNESBURG.png';

var SYDNEY = new Image();  SYDNEY.src = 'static/images/Cards/infection/Red/SYDNEY.png';
var JAKARTA = new Image(); JAKARTA.src = 'static/images/Cards/infection/Red/JAKARTA.png';
var MANILA = new Image();  MANILA.src = 'static/images/Cards/infection/Red/MANILA.png';
var HOCHIMINHCITY = new Image(); HOCHIMINHCITY.src = 'static/images/Cards/infection/Red/HO_CHI_MINH_CITY.png';
var BANGKOK = new Image(); BANGKOK.src = 'static/images/Cards/infection/Red/BANGKOK.png';
var TAIPEI = new Image(); TAIPEI.src = 'static/images/Cards/infection/Red/TAIPEI.png';
var OSAKA = new Image();  OSAKA.src = 'static/images/Cards/infection/Red/OSAKA.png';
var TOKYO = new Image();  TOKYO.src = 'static/images/Cards/infection/Red/TOKYO.png';
var HONGKONG = new Image();  HONGKONG.src = 'static/images/Cards/infection/Red/HONG_KONG.png';
var SHANGHAI = new Image(); SHANGHAI.src = 'static/images/Cards/infection/Red/SHANGHAI.png';
var SEOUL = new Image();  SEOUL.src = 'static/images/Cards/infection/Red/SEOUL.png';
var BEIJING = new Image();  BEIJING.src = 'static/images/Cards/infection/Red/BEIJING.png';

var KOLKATA = new Image(); KOLKATA.src = 'static/images/Cards/infection/Black/KOLKATA.png';
var CHENNAI = new Image();  CHENNAI.src = 'static/images/Cards/infection/Black/CHENNAI.png';
var DELHI = new Image();  DELHI.src = 'static/images/Cards/infection/Black/DELHI.png';
var MUMBAI = new Image();  MUMBAI.src = 'static/images/Cards/infection/Black/MUMBAI.png';
var KARACHI = new Image(); KARACHI.src = 'static/images/Cards/infection/Black/KARACHI.png';
var RIYADH = new Image();  RIYADH.src = 'static/images/Cards/infection/Black/RIYADH.png';
var TEHRAN = new Image();  TEHRAN.src = 'static/images/Cards/infection/Black/TEHRAN.png';
var MOSCOW = new Image();  MOSCOW.src = 'static/images/Cards/infection/Black/MOSCOW.png';
var BAGHDAD = new Image(); BAGHDAD.src = 'static/images/Cards/infection/Black/BAGHDAD.png';
var CAIRO = new Image();  CAIRO.src = 'static/images/Cards/infection/Black/CAIRO.png';
var ISTANBUL = new Image();  ISTANBUL.src = 'static/images/Cards/infection/Black/ISTANBUL.png';
var ALGIERS = new Image(); ALGIERS.src = 'static/images/Cards/infection/Black/ALGIERS.png';

var allPossibleInfectionCards = {SANFRANCISCO,CHICAGO,MONTREAL,NEWYORK,ATLANTA,WASHINGTON,LONDON,ESSEN,STPETERSBURG,MADRID,PARIS,MILAN,
LOSANGELES,MEXICOCITY,MIAMI,BOGOTA,LIMA,SANTIAGO,BUENOSAIRES,SAOPAULO,LAGOS,KHARTOUM,KINSHASA,JOHANNESBURG,
SYDNEY,JAKARTA,MANILA,HOCHIMINHCITY,BANGKOK,TAIPEI,OSAKA,TOKYO,HONGKONG,SHANGHAI,SEOUL,BEIJING,
KOLKATA,CHENNAI,DELHI,MUMBAI,KARACHI,RIYADH,TEHRAN,MOSCOW,BAGHDAD,CAIRO,ISTANBUL,ALGIERS}


function discardPile(options){
	this.context = options.context;
	this.cards = {};
	this.active = false;
	this.cardPos = 0;
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	
	this.toggleActive = function(options){
		if (this.active){
			this.active = false;
		}else{
			this.active = true;
		}
	}
	
	this.changeCards = function(options){
		console.log("oi_____",options)
		this.cards = {}
		this.addCard(options)
		// for (i in options){
			// console.log("OI!!",options[i].cardName)
			// this.addCard({options[i].cardName})
		// }
	}
	
	this.removeCard = function(options){
		delete this.cards[options.cardName];
	}
	
	this.addCard = function(options){		
		for ( i in options){
		//options = {cardname:cardName}
		cardFront = allPossibleInfectionCards[options[i].cardName];
			newPlayerCard = new infectionCard({
			id:"Infection player Card ",
			context:this.context,
			width: 200,
			height: 280,
			numberOfFrames: 1,
			ticksPerFrame: 1,
			xPos:optimalScreenWidth/2,
			yPos:this.yPos,
			xScale:1,
			yScale:1,
			imageBack: CardImage,
			imageFront: cardFront
		});
		cardName = options[i].cardName;
		this.cards[cardName] = newPlayerCard;
		this.cards[cardName].flipping = true;
		}
	}
	
	this.intpoint_inside_trigon = function(s, a, b, c){
    as_x = s.x-a.x;
    as_y = s.y-a.y;

    s_ab = (b.x-a.x)*as_y-(b.y-a.y)*as_x > 0;

    if((c.x-a.x)*as_y-(c.y-a.y)*as_x > 0 == s_ab) return false;

    if((c.x-b.x)*(s.y-b.y)-(c.y-b.y)*(s.x-b.x) > 0 != s_ab) return false;

    return true;
}
	
	
	
	this.click = function (options){
		xPos = options.x;
		yPos = options.y;

		if(xPos >= 1970 && xPos <= 1970+200
			&& yPos >= 950 && yPos <= 950+280 && !this.active){
				this.toggleActive({})
				this.cardPos = 0
				console.log("activated")
			}
			
		// this.context.font = "40px Sans-serif"
			// this.context.strokeStyle = 'red';//'green';
			// this.context.strokeText('X',optimalScreenWidth-100,100);
			
		if(xPos >=optimalScreenWidth-100 && xPos <= optimalScreenWidth-100+40
			&& yPos >= 100-40 && yPos <= 100 && this.active){
				console.log("close the discard viewer")
				this.toggleActive({})
			}
			
		a={x:100, y:this.yPos+90};
		b={x:50, y:this.yPos+140};
		c={x:100, y:this.yPos+190};		
		if(this.intpoint_inside_trigon(options,a,b,c)){
			this.cardPos = this.cardPos+1
		}		
		
					
				
		a={x:optimalScreenWidth-100, y:this.yPos+90};
		b={x:optimalScreenWidth-50, y:this.yPos+140};
		c={x:optimalScreenWidth-100, y:this.yPos+190};
		
		if(this.intpoint_inside_trigon(options,a,b,c)){
			this.cardPos = this.cardPos-1
		}
		    // width: 200,
			// height: 280,
			// xPos:1970,
			// yPos:950,
		
		

		
	}
	
	this.removeCard = function(options){		
		
	}
	
	this.render = function(){
		if(this.active){

			this.context.fillStyle="rgba(0, 0, 0, 0.8)";
			this.context.fillRect(0,0,optimalScreenWidth,optimalScreenHeight);
			
			this.context.font = "40px Verdana"
			this.context.strokeStyle = 'red';//'green';
			this.context.strokeText('X',optimalScreenWidth-100,100);

			
			startPoint = (this.xPos-(Object.keys(this.cards).length)/2*(510*0.4))+510*0.4*this.cardPos
			pos = 0;
			for(i in this.cards){
				
				this.cards[i].move (startPoint+510*0.4*pos,this.yPos)
				this.cards[i].render();
				pos++;
				
			}
			
			
			
			this.context.fillStyle="white";
			this.context.beginPath();
			this.context.moveTo(100, this.yPos+90);
			this.context.lineTo(50, this.yPos+140);
			this.context.lineTo(100, this.yPos+190);
			this.context.fill();
			
			this.context.beginPath();
			this.context.moveTo(optimalScreenWidth-100, this.yPos+90);
			this.context.lineTo(optimalScreenWidth-50, this.yPos+140);
			this.context.lineTo(optimalScreenWidth-100, this.yPos+190);
			this.context.fill();
		}
		
	}
	
	
}
