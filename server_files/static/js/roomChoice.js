var socket;
$(document).ready(function () {

    socket = io.connect('http://' + document.domain + ':' + location.port);



    $("#create_room_button").click(function(){
        // submit request for new room

        var value = $('#new_room_id').val();
        // clear the field
        $('#new_room_id').val("");
        // submit that value
        socket.emit('newroom', {roomName:value})
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
