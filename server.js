'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
    io.emit('login', new Date().toTimeString())
	
    socket.on('onLogin', (user) => {
      user.socket = socket.id; 
      users[socket.id] = user; 
      io.sockets.emit('newuser',users);
    });
  socket.on('onPaiement', (empty) => {
	 io.emit('paiment', new Date().toTimeString()) 
  });



    socket.on('onRecivemessage', (paiement) => {
      for (var i = users.length - 1; i >= 0; i--) {
        if(users[i].user.numero == paiement.numero){
          user.socket = socket.id; 
          users[socket.id] = user; 
          io.to(user[i].socket).emit('Confirmer',paiment.account);
          break
        }
      }

    });



	
  socket.on('disconnect', () => console.log('Client disconnected'));
  
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
