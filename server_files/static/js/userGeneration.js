var socket;

socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
        socket.emit('createUserObject', {});
    });
