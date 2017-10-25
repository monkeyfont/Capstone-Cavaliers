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

    $("#gameStarter").click(function(){
        socket.emit('startGame')

    });

    socket.on('messageReceived', function (data) {
//        $('#log').val($('#log').val() + data.msg + '\n');

        document.getElementById("lobbyMessageHistory").innerHTML = data.msg ;
        var messageBody = document.querySelector('#lobbyMessageHistory');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

    });

//     socket.on('playerJoined', function (data) {
//        $('#log').val($('#log').val() + data.msg + '\n');
//    });

    socket.on('gameStarted', function (data) {

        location.href ="/game";

    });
    socket.on('roleSet', function (data) {

        //$("#showRoleOptions").hide();
        document.getElementById("showRoleOptions").innerHTML = "<h2>You are now the "+data.msg+"</h2>";

    });


     socket.on('changeRoleAvailibility', function (data) {
     try {
        var elem = document.getElementById(data.msg).innerHTML = data.msg+" role is already taken!";
            }
    catch(err) {

        }

     });


    });


    function setRole(){

     var role= $('input[name=role]:checked', '#myForm').val()
     socket.emit('setRole', {roleChoice:role})


    }
