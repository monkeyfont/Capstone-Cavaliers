var socket;
$(document).ready(function () {
    socket = io.connect('http://' + document.domain + ':' + location.port);

    socket.on('connect', function () {
        socket.emit('checkroomprivacy');
    });

    socket.on('publicRooms', function (data) {
    console.log(data);
    var i = 0;
    for (roomID in data.rooms){
        console.log(data.rooms[0]);
        $('#roomlog').val($('#roomlog').val() + data.rooms[i] + '\n');
        i = i + 1;
    }
    i = 0;
    });
});
