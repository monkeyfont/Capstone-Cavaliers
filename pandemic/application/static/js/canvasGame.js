$("#messageBoxVisibility").click(function(){
    console.log("MessageBoxVisibility ");
    var imgObj = null;
    var animate;

    imgObj = document.getElementById('messageBox');
    imgObj.style.position= 'relative';
    imgObj.style.left = '0px';
    while imgObj.style.left<1000{
       imgObj.style.left = parseInt(imgObj.style.left) + 10 + 'px';
       animate = setTimeout(moveRight,20); // call moveRight in 20msec
       }
});