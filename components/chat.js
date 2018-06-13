var Message = require('../models/message');
var User = require('../models/user');
var mongoose = require('mongoose');

function chatConnection(io, socket) {
  sendMessage(io, socket);
  emitChat(socket);
}

function emitChat(socket) {
  socket.on('render_chat', function(userId, selectedUserId) {
    if(userId) {
      renderChat(socket, userId, selectedUserId);
    }
  });
}

function renderChat(socket, userId, selectedUserId) {
  var receiverId = selectedUserId;
  if(!receiverId) {
    User.findOne({'is_admin': true}, function(err, user) {
      receiverId = user._id;
      getChat(socket, userId, receiverId)
    });
  } else {
    getChat(socket, userId, receiverId);
  }
}

function getChat(socket, userId, receiverId) {
  var query = Message.find()
                     .or({ sender: userId, receiver: receiverId })
                     .or({ sender: receiverId, receiver: userId })
                     .populate({
                        path: 'sender',
                        model: 'User'
                      });

  query.sort('-created_date').exec(function(err, data){
    if(err) throw err;
    console.log('Sending old msgs!');
    socket.emit('load_old_msgs', data);
  });
}

function sendMessage(io, socket) {
  socket.on('send_message', function(params, callback){
    var message = params.message.trim();
    var userId = params.userId;
    var selectedUserId = params.selectedUserId;

    User.findOne({'_id': userId}).then((sender) => User.findOne({'is_admin': true}).then((receiver) => {
      Message.create({
        _id: new mongoose.Types.ObjectId(),
        sender: userId,
        receiver: selectedUserId ? selectedUserId : receiver._id,
        message: message
      });

      io.sockets.emit('new_message', {
        message: message,
        nick: sender.name,
        sender: userId,
        receiver: selectedUserId ? selectedUserId : receiver._id
      });
    }));
  });
}

module.exports.chatConnection = chatConnection;
