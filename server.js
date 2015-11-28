/**
 * Created by Carlos Ormeño on 19/11/15.
 */var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numberUsers=0;

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.emit('some event', { for: 'everyone' });


io.sockets.on('connection', function(socket){
    socket.broadcast.emit('hi');
    numberUsers++;
    console.log(numberUsers," usuarios conectados");
    io.sockets.emit('count', {
            number: numberUsers
        });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        socket.broadcast.emit('chat notify', msg);
    });
    socket.on('disconnect', function () {
        console.log('Desconectado!!! ');
        numberUsers--;
        io.sockets.emit('count', {
            number: numberUsers
        });
    });
    
    
});


http.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = http.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});