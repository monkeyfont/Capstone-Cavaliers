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
$("#jNewGame").click(function(){
        socket.emit('secretRoom')

});

$("#menuBottomRight").click(function(){
        socket.emit('existingRoom')

});
$("#menuBottomLeft").click(function(){
        socket.emit('help')

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
$("#goBackOnce").click(function(){
        location.href = "/join";
});
$("#showVideoPage").click(function(){
        location.href = "/videoTutorials";
});
$("#showActionsPage").click(function(){
        location.href = "/actions";
});
$("#showRules").click(function(){
        location.href = "/rules";
});



socket.on('joinSecret', function () {
    console.log ("Join Team")
    location.href ="/secret";

});

socket.on('helpRoom', function () {
    location.href ="/help";

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