var Message = require('../models/message');
var User = require('../models/user');
var mongoose = require('mongoose');

function chatConnection(socket) {
	socket.on('chat', function(userId) {
    if(userId) {
      renderChat(socket, userId);
      sendMessage(socket, userId)
    }
  });
}

function renderChat(socket, userId) {
	var query = Message.find()
                     .or([{ sender: userId }, { receiver: userId }])
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

function sendMessage(socket, userId) {
	socket.on('send_message', function(data, callback){
    var message =  data.trim();
  
    User.findOne({'_id': userId}).then((sender) => User.findOne({'is_admin': true}).then((receiver) => {
      Message.create({
        _id: new mongoose.Types.ObjectId(),
        sender: userId,
        receiver: receiver._id,
        message: message
      });

      socket.emit('new_message', {
        message: message,
        nick: sender.name,
        sender: userId,
        receiver: receiver._id
      });
    }));
  });
}

module.exports.chatConnection = chatConnection;
