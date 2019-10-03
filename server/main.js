var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var messages = [{
    text: "Hola soy un mensaje",
    author: "Jhon Doe"
}];

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

http.listen(3000, function() {
    console.log("Servidor corriendo en http://localhost:3000");
});