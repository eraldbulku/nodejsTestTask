var app = require('./app');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var chatComponent = require('./components/chat/ChatController');
var config = require('../config');

/* Socket */
io.sockets.on('connection', function(socket) {
  chatComponent.chatConnection(io, socket);
  socket.on('disconnect', function() {
    console.log('client disconnect...', socket.id);
  });
});

// listen on port 3000
server.listen(config.serverPort, function () {
  console.log('Express app listening on port ' + config.serverPort);
});
