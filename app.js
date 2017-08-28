var port = process.env.PORT || 3000;
var app = require('./config/server');

var server = app.listen(port, function () {
    console.log(`Servidor express rodando na porta ${port}.`);
});

var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', function (socket) {
    console.log('usuário conectou');

    socket.on('disconnect', function () {
        console.log('usuário desconectou');
    });
    
    socket.on('sendMessageFromServer', function (data) {
        // Dialogo
        socket.emit(
            'reportNewMessage',
            { nickname: data.nickname, message: data.message }
        );
        socket.broadcast.emit(
            'reportNewMessage',
            { nickname: data.nickname, message: data.message }
        );

        // Participantes
        if (parseInt(data.nicknameUpdated) == 0) {
            socket.emit(
                'reportNewUser',
                { nickname: data.nickname }
            );
            socket.broadcast.emit(
                'reportNewUser',
                { nickname: data.nickname }
            );
        }
    });
});