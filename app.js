// var express = require('express');
var app = require('./config/express')();
var http = require('http').Server(app);
var io  = require('socket.io')(http);
// var rotasProdutos = require('./app/routes/produtos')(app);

// app.listen(3000, function() {
//    console.log('Servidor rodando');
// });

//disponibilizando o io para todas as rotas
app.set('io', io);

//se tiver essa porta definida
var porta = process.env.PORT || 3000;

//por conta do socket io podemos chamar o http diretament
http.listen(porta, function() {
   console.log('Servidor rodando');
});
