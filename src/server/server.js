var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function(socket){
    socket.on('login', function(msg){
        console.log('login attempt: ' + msg);
        io.emit('loginResponse', true);
    });
});
app.use(express.static('public'));

http.listen(3000, function(){
    console.log('listening on *:3000');
});


