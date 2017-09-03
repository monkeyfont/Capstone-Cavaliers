var snd = new Audio("static/A Instrumental Masterpiece.mp3"); // buffers automatically when created

snd.play();

$('.Audio').on('click', function(e){
		// alert("Button clicked with value: "+e.currentTarget.value);
		if (e.currentTarget.id == "Play"){
			if (snd.paused){
				snd.play();
			}else{
				snd.pause();
			}
			
			alert("play");
		}else if(e.currentTarget.id == "Mute"){
			if (snd.muted == true){
				snd.muted = false;
			}else{
				snd.muted = true;
			}
			alert("Mute");
		}
		
	});