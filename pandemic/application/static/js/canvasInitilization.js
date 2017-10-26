var scrnWidth = screen.width;
var scrnHeight = screen.height;
console.log("Total Width: "+scrnWidth+" Total Height: "+scrnHeight)
var optimalScreenWidth = 2196;//2560; //1920
var optimalScreenHeight = 1235;//1440; //1080;

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