var socket;
$(document).ready(function () {

    socket = io.connect('http://' + document.domain + ':' + location.port);

    socket.on('connect', function () {

        socket.emit('join', {});
    });

    socket.on('joined', function (data) {
        $('#log').val($('#log').val() + data.msg + '\n');
    });

    $("#movement_button").click(function(){
        // get the value from the movement box
        var value = $('#movement_input').val();
        // clear the field
        $('#movement_input').val("");
        // submit that value
        socket.emit('move', {move_location:value})

    });

    socket.on('moved', function (data) {
        $('#log').val($('#log').val() + data.msg + '\n');
    });

});
