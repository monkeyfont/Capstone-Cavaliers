var scrnWidth = window.innerWidth;//screen.width;
var scrnHeight = window.innerHeight;//screen.height;
console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
var optimalScreenWidth = 1920;
var optimalScreenHeight = 1080;

var screenHeightPercentage = scrnHeight/optimalScreenHeight;
var screenWidthPercentage = scrnWidth/optimalScreenWidth;

var scaleSize = 1;

// sets the scalesize to the lower of height or width
if (screenHeightPercentage<screenWidthPercentage){
	scaleSize = screenHeightPercentage;
}else{
	scaleSize = screenWidthPercentage;
}

var canvas = document.getElementById("myCanvas");
canvas.width = optimalScreenWidth*scaleSize;
canvas.height = optimalScreenHeight*scaleSize;
var context = canvas.getContext("2d");
context.scale(scaleSize,scaleSize);

// console.log(canvas.getContext("2d").getScale())
console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
console.log("scale Size:"+scaleSize);




// window.addEventListener('resize',canvasResize);

// function canvasResize(){
	// context.scale(scaleSize,scaleSize);
	// canvas.width = optimalScreenWidth*scaleSize;
	// canvas.height = optimalScreenHeight*scaleSize;
	// console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
	// console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
	// console.log("scale Size:"+scaleSize);
// }


var cardNumber = 0;
var socket;


socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
        socket.emit('joinGame', {});

    });


socket.on('joined', function (data) {
        console.log(data.msg + '\n');


    });




    function myFunction(data){
//$("#clickTest").click(function(){
        // get the value from the movement box
        var value = " has clicked " + data;
        // clear the field
        // submit that value
        socket.emit('click', {mess:value})

    };

function checkMove(city){


    socket.emit('checkMove', {cityName:city})

    };


socket.on('clicked', function (data) {

        console.log(data.msg);

    });


socket.on('checked', function (data) {
        //alert(data.msg);
        check=data.msg;
        var city=eval(data.city);
        console.log(check+" "+ city)
        if (check ==true){
            player.move(city.xPos,city.yPos);
	}
	else{
	    console.log("Sorry invalid move");
	}



    });


	
$('.btn').on('click', function(changePlayer){
	if (changePlayer.currentTarget.id == 'up-left'){
		player.yStart=120;
	}
	if (changePlayer.currentTarget.id == 'up'){
		player.yStart=160;
	}
	if (changePlayer.currentTarget.id == 'up-right'){
		player.yStart=280;
	}
	if (changePlayer.currentTarget.id == 'left'){
		player.yStart=80;
	}
	if (changePlayer.currentTarget.id == 'stop'){
		
	}
	if (changePlayer.currentTarget.id == 'right'){
		player.yStart=240;
	}
	if (changePlayer.currentTarget.id == 'down-left'){
		player.yStart=40;
	}
	if (changePlayer.currentTarget.id == 'down'){
		player.yStart=0;
	}
	if (changePlayer.currentTarget.id == 'down-right'){
		player.yStart=200;
	}
	
	
	
	// alert("Button clicked with value: "+changePlayer.currentTarget.id);
		
	});		
	

	
var coinImage = new Image();

coinImage.src = "static/images/coin-sprite-animation.png";
var playerImage = new Image();
playerImage.src = 'static/images/player6.png';
var mapImage = new Image();
mapImage.src = 'static/images/WorldMap.jpg';
var cityImage = new Image();
cityImage.src = "static/images/city token.png";


// var cities = {
	// city1:{connections:['city2','city3'],x:100,y:100},
	// city2:{connections:['city1','city4','city5'],x:400,y:400},
	// city3:{connections:['city1','city4','city5'],x:630,y:720},
	// city4:{connections:['city2','city3'],x:802,y:605},
	// city5:{connections:['city2','city3'],x:1824,y:950}
// };

// var outbreakCount = 0;
// var blueInfection = new Image(); blueInfection.src = 'static/images/InfectionStatusBlue.png';
// var blackInfection = new Image(); blackInfection.src = 'static/images/InfectionStatusBlack.png';
// var redInfection = new Image(); redInfection.src = 'static/images/InfectionStatusRed.png';
// var yellowInfection = new Image(); yellowInfection.src = 'static/images/InfectionStatusYellow.png';

function displayOutbreaks(outbreakCount){
    //if(outbreakCount >= 8){//player has lost}
    //if odd outbreakCount / (outbreakCount%2 != 0){move up and right}
    //else {move down and right}
  
    //based upon outbreak counter looking like: -_-_-_-_o
    //  1   3   5   7   [Lost]
    //    2   4    6   8
}

//function infect(infectionColour, cityToInfect, amount){
function infecting(){
	ATLANTA.infect({});
	for (i in locations){
		console.log(locations[i])
		locations[i].infect({})
		console.log("colour",locations[i].colour)
		console.log("infection array",locations[i].infectionStatus)
		console.log("infections",locations[i].infectionStatus[locations[i].colour][0])
		console.log("___checking__")
		// locations[i].renderCheck()
	};
    
    
}




var SANFRANCISCO = new city({id:'SANFRANCISCO', colour:'blue',xPos:260,yPos:410,connections:['TOKYO','MANILA','LOSANGELES','CHICAGO']});
var CHICAGO = new city({id:'CHICAGO',colour:'blue',xPos:390,yPos:330,connections:['SANFRANCISCO','LOSANGELES','MEXICOCITY','ATLANTA','MONTREAL']});
var MONTREAL = new city({id:'MONTREAL',colour:'blue',xPos:520,yPos:350,connections:['CHICAGO','WASHINGTON','NEWYORK']});
var NEWYORK = new city({id:'NEWYORK',colour:'blue',xPos:590,yPos:400,connections:['MONTREAL','WASHINGTON','MADRID','LONDON']});
var ATLANTA = new city({id:'ATLANTA',colour:'blue',xPos:400,yPos:444,connections:['CHICAGO','MIAMI','WASHINGTON']});
var WASHINGTON = new city({id:'WASHINGTON',colour:'blue',xPos:533,yPos:475,connections:['MONTREAL','ATLANTA','MIAMI','NEWYORK']});
var LONDON = new city({id:'LONDON',colour:'blue',xPos:844,yPos:390,connections:['NEWYORK','MADRID','PARIS','ESSEN']});
var ESSEN = new city({id:'ESSEN',colour:'blue',xPos:895,yPos:345,connections:['LONDON','PARIS','MILAN','STPETERSBURG']});
var STPETERSBURG = new city({id:'STPETERSBURG',colour:'blue',xPos:988,yPos:340,connections:['ESSEN','ISTANBUL','MOSCOW']});
var MADRID = new city({id:'MADRID',colour:'blue',xPos:832,yPos:470,connections:['NEWYORK','SAOPAULO','ALGIERS','PARIS','LONDON']});
var PARIS = new city({id:'PARIS',colour:'blue',xPos:856,yPos:434,connections:['LONDON','MADRID','ALGIERS','MILAN','ESSEN']});
var MILAN = new city({id:'MILAN',colour:'blue',xPos:890,yPos:420,connections:['ESSEN','PARIS','ISTANBUL']});

var LOSANGELES = new city ({id:'LOSANGELES',colour:'yellow',xPos:258,yPos:508,connections:['SANFRANCISCO','CHICAGO','MEXICOCITY','SYDNEY']});
var MEXICOCITY = new city ({id:'MEXICOCITY',colour:'yellow',xPos:325,yPos:590,connections:['LOSANGELES','LIMA','BOGOTA','MIAMI','CHICAGO']});
var MIAMI = new city ({id:'MIAMI',colour:'yellow',xPos:430,yPos:530,connections:['ATLANTA','MEXICOCITY','BOGOTA','WASHINGTON']});
var BOGOTA = new city ({id:'BOGOTA',colour:'yellow',xPos:444,yPos:668,connections:['MIAMI','MEXICOCITY','LIMA','BUENOSAIRES','SAOPAULO']});
var LIMA = new city ({id:'LIMA',colour:'yellow',xPos:447,yPos:770,connections:['MEXICOCITY','SANTIAGO','BOGOTA']});
var SANTIAGO = new city ({id:'SANTIAGO',colour:'yellow',xPos:459,yPos:880,connections:['LIMA']});
var BUENOSAIRES = new city ({id:'BUENOSAIRES',colour:'yellow',xPos:566,yPos:855,connections:['BOGOTA','SAOPAULO']});
var SAOPAULO = new city ({id:'SAOPAULO',colour:'yellow',xPos:620,yPos:785,connections:['BOGOTA','BUENOSAIRES','LAGOS','MADRID']});
var LAGOS = new city ({id:'LAGOS',colour:'yellow',xPos:822,yPos:650,connections:['SAOPAULO','KINSHASA','KHARTOUM']});
var KHARTOUM = new city ({id:'KHARTOUM',colour:'yellow',xPos:1000,yPos:640,connections:['LAGOS','KHARTOUM','JOHANNESBURG','CAIRO']});
var KINSHASA = new city ({id:'KINSHASA',colour:'yellow',xPos:924,yPos:700,connections:['LAGOS','JOHANNESBURG','KHARTOUM']});
var JOHANNESBURG = new city ({id:'JOHANNESBURG',colour:'yellow',xPos:980,yPos:850,connections:['KINSHASA','KHARTOUM']});

var SYDNEY = new city({id:'SYDNEY', colour:'red', xPos:1670, yPos:904, connections:['MANILA','JAKARTA','LOSANGELES']});
var JAKARTA= new city({id:'JAKARTA', colour:'red', xPos:1430, yPos:700, connections:['SYDNEY','HOCHIMINCITY','BANGKOK','CHENNAI']});
var MANILA = new city({id:'MANILA', colour:'red', xPos:1510, yPos:590, connections:['SYDNEY','SANFRANCISCO','HOCHIMINCITY','HONGKONG']});
var HOCHIMINCITY = new city({id:'HOCHIMINCITY', colour:'red', xPos:1430, yPos:630, connections:['MANILA','JAKARTA','BANGKOK','HONGKONG']});
var BANGKOK = new city({id:'BANGKOK', colour:'red', xPos:1360, yPos:570, connections:['KOULKATA','HONGKONG','HOCHIMINCITY','JAKARTA','CHENNAI']});
var TAIPEI  = new city({id:'TAIPEI', colour:'red', xPos:1490, yPos:540, connections:['OSAKA','SHANGHAI','HONGKONG','MANILA']});
var OSAKA = new city({id:'OSAKA', colour:'red', xPos:1546, yPos:480, connections:['TOKYO','TAIPEI']});
var TOKYO = new city({id:'TOKYO', colour:'red', xPos:1560, yPos:400, connections:['SEOUL','OSAKA','SANFRANCISCO','SHANGHAI']});
var HONGKONG = new city({id:'HONGKONG', colour:'red', xPos:1430, yPos:520, connections:['SHANGHAI','TAIPEI','MANILA','HOCHIMINCITY','BANGKOK','KOULKATA']});
var SHANGHAI = new city({id:'SHANGHAI', colour:'red', xPos:1440, yPos:460, connections:['BEIJING','SEOUL','TOKYO','TAIPEI','HONGKONG']});
var SEOUL = new city({id:'SEOUL', colour:'red', xPos:1485, yPos:405, connections:['TOKYO','SHANGHAI','BEIJING']});
var BEIJING = new city({id:'BEIJING', colour:'red', xPos:1395, yPos:415, connections:['SEOUL','SHANGHAI']});

var KOULKATA = new city({id:'KOULKATA', colour:'black', xPos:1315, yPos:540, connections:['HONGKONG','BANGKOK','CHENNAI','DELHI']});
var CHENNAI = new city({id:'CHENNAI', colour:'black', xPos:1280, yPos:606, connections:['DELHI','KOULKATA','BANGKOK','JAKARTA','MUMBAI']});
var DELHI = new city({id:'DELHI', colour:'black', xPos:1270, yPos:505, connections:['KOULKATA','CHENNAI','MUMBAI','KARACHI','TEHRAN']});
var MUMBAI = new city({id:'MUMBAI', colour:'black', xPos:1245, yPos:580, connections:['KARACHI','DELHI','CHENNAI']});
var KARACHI = new city({id:'KARACHI', colour:'black', xPos:1190, yPos:515, connections:['TEHRAN','DELHI','MUMBAI','RIYAOH','BAGHDAD']});
var RIYAOH = new city({id:'RIYAOH', colour:'black', xPos:1090, yPos:555, connections:['BAGHDAD','KARACHI','CAIRO']});
var TEHRAN = new city({id:'TEHRAN', colour:'black', xPos:1155, yPos:440, connections:['DELHI','KARACHI','BAGHDAD','MOSCOW']});
var MOSCOW = new city({id:'MOSCOW', colour:'black', xPos:1005, yPos:400, connections:['TEHRAN','ISTANBUL','STPETERSBURG']});
var BAGHDAD = new city({id:'BAGHDAD', colour:'black', xPos:1075, yPos:490, connections:['TEHRAN','KARACHI','RIYAOH','CAIRO','ISTANBUL']});
var CAIRO = new city({id:'CAIRO', colour:'black', xPos:990, yPos:520, connections:['ISTANBUL','BAGHDAD','RIYAOH','ALGIERS']});
var ISTANBUL = new city({id:'ISTANBUL', colour:'black', xPos:980, yPos:460, connections:['STPETERSBURG','MOSCOW','BAGHDAD','CAIRO','ALGIERS','MILAN']});
var ALGIERS = new city({id:'ALGEIRS', colour:'black', xPos:900, yPos:500, connections:['PARIS','ISTANBUL','CAIRO','MADRID']});
// var LOSANGELES = new city ({id:,colour:'yellow',xPos:0,yPos:0,connections:[]});

var locations = {SANFRANCISCO,CHICAGO,MONTREAL,NEWYORK,ATLANTA,WASHINGTON,LONDON,ESSEN,STPETERSBURG,MADRID,PARIS,MILAN,
LOSANGELES,MEXICOCITY,MIAMI,BOGOTA,LIMA,SANTIAGO,BUENOSAIRES,SAOPAULO,LAGOS,KHARTOUM,KINSHASA,JOHANNESBURG,
SYDNEY,JAKARTA,MANILA,HOCHIMINCITY,BANGKOK,TAIPEI,OSAKA,TOKYO,HONGKONG,SHANGHAI,SEOUL,BEIJING,
KOULKATA,CHENNAI,DELHI,MUMBAI,KARACHI,RIYAOH,TEHRAN,MOSCOW,BAGHDAD,CAIRO,ISTANBUL,ALGIERS
};

// infectionImage = new Image(); infectionImage.src = 'static/images/InfectionStatusYellow.png';
// AtlantaInfection = new infection({
	// id:"player",
			// context: canvas.getContext("2d"),
			// width: 32,
			// height: 40,
			// xPos:ATLANTA.xPos,
			// yPos:ATLANTA.yPos,
			// xScale:2,
			// yScale:2,
			// image: infectionImage		
// })





canvas.addEventListener('click', function(evt) {
	var mousePos ={
		x: (evt.clientX - canvas.getBoundingClientRect().left)/scaleSize,
		y: (evt.clientY - canvas.getBoundingClientRect().top)/scaleSize
	}	
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;



	for (var i in spriteList){
		// is the click on the image?
		if (mousePos.x >= spriteList[i].xPos && mousePos.x <= spriteList[i].xPos+(spriteList[i].width*spriteList[i].xScale) &&
			mousePos.y >= spriteList[i].yPos && mousePos.y <= spriteList[i].yPos+(spriteList[i].height*spriteList[i].yScale)){
				console.log(spriteList[i].id,"was clicked");
				myFunction(spriteList[i].id);
				if (spriteList[i].id == 'Infection Card'){
					spriteList[i].flip();
				}
				if (spriteList[i].id == 'Infection Deck'){
					createCard(cardNumber);
					cardNumber ++;
				}
			}
	}
	for (var i in cardList){
		if (mousePos.x >= cardList[i].xPos && mousePos.x <= cardList[i].xPos+(cardList[i].width*cardList[i].xScale) &&
			mousePos.y >= cardList[i].yPos && mousePos.y <= cardList[i].yPos+(cardList[i].height*cardList[i].yScale)){
			console.log(cardList[i].id,"was clicked------------------");	
			console.log(cardList[i].toFlip,"was clicked------------------");
			cardList[i].flip();
		}
	}

	// for (var i in cities){
		// if (mousePos.x >= cities[i].x && mousePos.x <= (cities[i].x + 25) &&
			// mousePos.y >= cities[i].y && mousePos.y <= (cities[i].y + 25)){
				// console.log(i,'was clicked');
		// }
	// }
	for (var i in locations){
		if (mousePos.x >= locations[i].xPos-locations[i].radius && mousePos.x <= (locations[i].xPos+locations[i].radius) &&
			mousePos.y >= locations[i].yPos-locations[i].radius && mousePos.y <= (locations[i].yPos+locations[i].radius)){
				console.log('city ', i ,' was clicked');
				checkMove(i);

			}
			
	}
		
		
})



function gameLoop(){
	window.requestAnimationFrame(gameLoop);


	// map.update();
	// map.render();
	canvas.getContext("2d").drawImage(mapImage,0,0)// quick workaround because loading the map as a sprite is broken

/* 	for (var i in cities){
		canvas.getContext("2d").drawImage(cityImage,cities[i].x,cities[i].y);
		// context.font="30px Verdana";
		// context.fillStyle = 'red';
		// context.fillText(i,cities[i].x,cities[i].y);
	} */
	// console.log("city",locations['TOKYO'])
	for (var start in locations){
		// console.log("start",locations[start].id);
		// console.log("connections",locations[start].connections);
		for (var end in locations[start].connections){			
			// console.log("end",end);
			// console.log("end city", locations[locations[start].connections[end]]);
			var endCity = locations[locations[start].connections[end]];
			
			if (Math.abs(locations[start].xPos-endCity.xPos) > 800){
				context.beginPath(); 
				// Staring point (10,45)
				context.moveTo(locations[start].xPos,locations[start].yPos);
				// End point (180,47)
				if (locations[start].xPos >800){
					((locations[start].yPos-endCity.yPos)/2)
					context.lineTo(1920,endCity.yPos+((locations[start].yPos-endCity.yPos)/2));
				}else{
					context.lineTo(0,endCity.yPos+((locations[start].yPos-endCity.yPos)/2));
				}
				// Make the line visible		  
				context.lineWidth = 4;
				// set line color
				context.strokeStyle = 'rgba(225,225,225,0.5)';
				context.stroke();
			}else{			
			//console.log("actual end city", locations[locations[start].connections[end]].id)		
				context.beginPath(); 
				// Staring point (10,45)
				context.moveTo(locations[start].xPos,locations[start].yPos);
				// End point (180,47)
				context.lineTo(endCity.xPos,endCity.yPos);
				// Make the line visible		  
				context.lineWidth = 4;
				// set line color
				
				context.strokeStyle = 'rgba(225,225,225,0.5)';
				context.stroke();
			}

		}
	}
	for (var i in locations){
		locations[i].render();
	}
	// coin.update();
	// coin.render();
	// coin2.update();
	// coin2.render();
	// coin3.update();
	// coin3.render();
	player.update();
	player.render();
	deck.render();
	card.render();
	for (var i in cardList){
		cardList[i].render();
	}
	
	outbreakCount.render();
	infectRate.render();
	// AtlantaInfection.render()
	// for (var i in cities){

		// context.font="30px Verdana";
		// context.fillStyle = 'orange';
		// context.fillText(i,cities[i].x,cities[i].y);
	// }
	// for (i in locations){
		// console.log(locations[i])
		// locations[i].infect({})
		// console.log("colour",locations[i].colour)
		// console.log("infection array",locations[i].infectionStatus)
		// console.log("infections",locations[i].infectionStatus[locations[i].colour][0].render())
	// };
	
	
	// console.log(card.flipping,card.width);
	// console.log("-----------------------",card.toFlip);
	

	//console.log("gameloop");
}

// canvas.width = 1000;
// canvas.height = 1000;



// var map = sprite({
	// context: canvas.getContext("2d"),
    // width: 1920,
    // height: 1080,
	// numberOfFrames: 1,
	// ticksPerFrame: 10,
	// image: mapImage
	// });	



	
// var coin3 = new sprite({
	// id:"coin3",
    // context: canvas.getContext("2d"),
    // width: 100,
    // height: 100,
	// numberOfFrames: 10,
	// ticksPerFrame: 3,
	// xPos:300,
	// yPos:300,
    // image: coinImage	
	// });	

// var coin = new sprite({
	// id:"coin",
    // context: canvas.getContext("2d"),
    // width: 100,
    // height: 100,
	// numberOfFrames: 10,
	// ticksPerFrame: 16,
	// xPos:100,
	// yPos:100,
    // image: coinImage	
	// });		
	
// var coin2 = new sprite({
	// id:"coin2",
    // context: canvas.getContext("2d"),
    // width: 100,
    // height: 100,
	// numberOfFrames: 10,
	// ticksPerFrame: 16,
	// xPos:400,
	// yPos:400,
    // image: coinImage	
	// });	
	
var player = new player({
	id:"player",
	context: canvas.getContext("2d"),
    width: 32,
    height: 40,
	numberOfFrames: 4,
	ticksPerFrame: 16,
	xPos:ATLANTA.xPos,
	yPos:ATLANTA.yPos,
	xScale:2,
	yScale:2,
    image: playerImage	
})

var CardImage = new Image();
CardImage.src = 'static/images/infection-Cards.png';
var cardFront = new Image();
cardFront.src = 'static/images/infection-Front.png';
var card = new flippable({
	id:"Infection Card",
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
})

var deck = new sprite({
	id:"Infection Deck",
	context: canvas.getContext("2d"),
    width: 584,
    height: 800,
	numberOfFrames: 1,
	ticksPerFrame: 1,
	xPos:1600,
	yPos:40,
	xScale:0.5,
	yScale:0.5,
    image: CardImage	

})
var cardList = [];
function createCard(id) {
	this.cardListing = cardList.push(new flippable({
	id:"Infection Card "+id,
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
}))
}



function flippable(options) {
	this.id = options.id,			
	this.context = options.context;
	this.width = options.width;
	this.height = options.height;
	this.widthDraw = options.width;
	this.heightDraw = options.height;
	this.imageBack = options.imageBack;
	this.imageFront = options.imageFront;
	this.loop = options.loop || true; // do we loop the sprite, or just play it once
	this.yPos = options.yPos || 0;
	this.xPos = options.xPos || 0;
	this.xScale = options.xScale || 1;
	this.yScale = options.yScale || 1;
	this.flipping = false;
	this.flipSpeed = options.flipSpeed || 20;
	this.flipStage = 0;
	this.currentImage = this.imageBack;
	this.toFlip = false;
	this.flip = function() {
		// if the card is on its back flip to its front
		// scale the card down
		// swap the card
		// scale the card up
		this.flipping = true;
		if (this.flipStage == 10){
			
		}else{
			this.widthDraw -= this.width/this.flipSpeed;
		}
		if (this.widthDraw <0.1 && this.widthDraw > -0.1){
			this.toFlip=true;
		}
		
		if (this.toFlip == true){
			if (this.currentImage==this.imageBack){
				this.currentImage = this.imageFront;
			}else{
				this.currentImage=this.imageBack;
			}
			this.toFlip = false;
		}
			
		
		if (this.widthDraw <= -this.width){
			this.flipping = false;
			this.widthDraw = this.width;
			this.xPos = this.xPos-(this.width*this.xScale);
		}
	}
	
	// take image 1, shrink into middle, show image 2 grow from middle
	
	this.render = function () {
		if (this.flipping == true){
			this.flip();
		}
        // Draw the animation
		//console.log("image render",this.image.src)
		this.context.drawImage(
		this.currentImage, //image to use
		0, // x position to start clipping 
		0, // y position to start clipping
		this.width, //width of clipped image
		this.height, // height of clipped image
		this.xPos, //x position for image on canvas
		this.yPos, // y position for image on canvas
		this.widthDraw*this.xScale, // width of image to use 
		this.heightDraw*this.yScale); // height of image to use
    };
}

outbreakCount = new outbreakCounter({})
infectRate = new infectionRate({})


// coin,coin2,coin3,
spriteList = [player,card,deck];
	
mapImage.addEventListener("load", gameLoop);	
// coinImage.addEventListener("load", gameLoop);
// window.onload = function() {
// coin.render();
// console.log("pie");
// };

