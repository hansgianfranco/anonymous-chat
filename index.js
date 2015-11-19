/**
 * Created by Carlos Ormeño on 19/11/15.
 */var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        socket.broadcast.emit('chat notify', msg);
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});