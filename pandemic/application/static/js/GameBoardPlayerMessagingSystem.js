var socket;
$(document).ready(function () {

    socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function () {
        socket.emit('getMessages');
    });
    $("#message_button").click(function(){
        // get the value from the movement box
        var value = $('#message_input').val();
        // clear the field
        $('#message_input').val("");
        // submit that value
        socket.emit('sendMessage', {message:value})

    });

    socket.on('messageReceived', function (data) {
//        $('#log').val($('#log').val() + data.msg + '\n');

        document.getElementById("lobbyMessageHistory").innerHTML = data.msg ;
        var messageBody = document.querySelector('#lobbyMessageHistory');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

    });



});
