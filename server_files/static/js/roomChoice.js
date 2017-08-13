var socket;
$(document).ready(function () {

    socket = io.connect('http://' + document.domain + ':' + location.port);



 $("#userLogin").click(function(){

        var userName = $('#userName').val();
        var password = $('#userPassword').val();
        // clear the field
        $('#userName').val("");
        $('#userPassword').val("");
        // submit that value
        socket.emit('loguser', {userN:userName,userP:password})

        // submit request for new room
    });

 $("#create_room_button").click(function(){

        // get the value from the join room box
        var name = $('#new_user_name').val();
        // clear the field
        $('#new_user_name').val("");
        // submit that value
        socket.emit('newroom', {playerName:name})

        // submit request for new room

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

    socket.on('created', function (data) {
        $('#log').val($('#log').val() + data.msg + '\n');
    });

});
