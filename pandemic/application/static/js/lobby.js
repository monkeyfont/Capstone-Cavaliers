var socket;
$(document).ready(function () {
    socket = io.connect('http://' + document.domain + ':' + location.port);

    socket.on('connect', function () {
        socket.emit('checkRoomPrivacy');
        // This will be called automatically
        // it will allow the user to request all the public rooms
});
$("#topMenu").click(function(){
        socket.emit('newRoom')

});
$("#goBack").click(function(){
        socket.emit('goBack')

});
$("#menuBottomRight").click(function(){
        socket.emit('existingRoom')

});

    socket.on('publicLobbies', function (data) {
    var i = 0;
    for (lobbyName in data.lobbies){
        $('#roomlog').val($('#roomlog').val() + data.lobbies[i] + '\n');
        i = i + 1;
    }
    i = 0;
    });


$("#goBack").click(function(){
        location.href = "/home";

});
socket.on('joinR', function () {
    console.log ("Join Team")
    location.href ="/join";

});
socket.on('createNewRoom', function () {

    location.href ="/new";

});
socket.on('joinRoom', function () {

    location.href ="/lobby";

});
});