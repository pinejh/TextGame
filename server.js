var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
app.use(express.static(path.join(__dirname, 'app')));

var io = require('socket.io').listen(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});

"use strict";
var Player = require('./Player.js');

var players = [];

io.sockets.on('connection', function(socket, name) {
  players.push(new Player(socket.handshake.query.name, socket.handshake.query.id, players.length));
  console.log(players[players.length-1]);
  socket.on('enter', function(player, id, text) {
    io.sockets.emit('enter', player, id, text);
  });
  socket.on('pm', function(sender, target, msg) {
    io.sockets.emit('pm', sender, target, msg);
  });
});
