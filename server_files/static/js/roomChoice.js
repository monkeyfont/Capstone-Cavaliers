var socket;
$(document).ready(function () {

    socket = io.connect('http://' + document.domain + ':' + location.port);

    socket.on('connect', function () {
        socket.emit('join', {});
    });



    $("#create_room_button").click(function(){
        // submit request for new room
        socket.emit('newroom', "")
        location.href = "user"

    });

    $("#join_room").click(function(){
        // get the value from the join room box
        var value = $('#room_id').val();
        // clear the field
        $('#room_id').val("");
        // submit that value
        socket.emit('joinexistingroom', {roomName:value})
        location.href = "user"
    });

});
