    var socket;
    $(document).ready(function () {

    socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function () {
        socket.emit('playerJoined');
    });

     socket.on('playerJoined', function (data) {
        $('#log').val($('#log').val() + data.msg + '\n');
    });

    socket.on('gameStarted', function (data) {

        location.href ="/game";

    });


    $("#gameStarter").click(function(){
        socket.emit('startGame')

    });
    });
