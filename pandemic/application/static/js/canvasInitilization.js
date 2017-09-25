var scrnWidth = window.innerWidth;//screen.width;
var scrnHeight = window.innerHeight;//screen.height;
console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
var optimalScreenWidth = 2560; //1920
var optimalScreenHeight = 1440; //1080;

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

console.log("Total Width Percent: "+screenWidthPercentage+" Total Height Percent: "+screenHeightPercentage);
console.log("scale Size:"+scaleSize);








//-------------------------PLAYER ACTIONS WEB SOCKET FUNCTIONS----------------

var mapImage = new Image();
mapImage.src = 'static/images/backgroundMap.jpg'






canvas.addEventListener('click', function(evt) {
	var mousePos ={
		x: (evt.clientX - canvas.getBoundingClientRect().left)/scaleSize,
		y: (evt.clientY - canvas.getBoundingClientRect().top)/scaleSize
	}
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	console.log(message);


	for (var i in spriteList){
		// is the click on the image?
		if (mousePos.x >= spriteList[i].xPos && mousePos.x <= spriteList[i].xPos+(spriteList[i].width*spriteList[i].xScale) &&
			mousePos.y >= spriteList[i].yPos && mousePos.y <= spriteList[i].yPos+(spriteList[i].height*spriteList[i].yScale)){
				console.log(spriteList[i].id,"was clicked");
				// myFunction(spriteList[i].id);
				if (spriteList[i].id == 'Infection Card'){
					spriteList[i].flip();
				}

			}
	}


	for (var i in locations){
		if (mousePos.x >= locations[i].xPos-locations[i].radius && mousePos.x <= (locations[i].xPos+locations[i].radius) &&
			mousePos.y >= locations[i].yPos-locations[i].radius && mousePos.y <= (locations[i].yPos+locations[i].radius)){
				console.log('city ', i ,' was clicked');
				checkMove(i);

			}

	}


})