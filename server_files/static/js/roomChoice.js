var socket;
$(document).ready(function () {

    socket = io.connect('http://' + document.domain + ':' + location.port);



    $("#create_room_button").click(function(){

        // get the value from the join room box
        var value = $('#new_room_id').val();
        var name = $('#new_user_name').val();
        // clear the field
        $('#new_user_name').val("");
        // submit that value
        socket.emit('newroom', {playerName:name})

        // submit request for new room
<<<<<<< HEAD

        var value = $('#new_room_id').val();
        // clear the field
        $('#new_room_id').val("");
        // submit that value
        socket.emit('newroom', {roomName:value})
=======
>>>>>>> Jorge
        location.href = "user"

    });

    $("#join_room").click(function(){
        // get the value from the join room box
        var value = $('#room_id').val();
        var name = $('#user_name').val();
        // clear the field
        $('#room_id').val("");
        $('#user_name').val("");
        // submit that value
        socket.emit('joinexistingroom', {roomName:value,playerName:name})
        location.href = "user"
    });

});
