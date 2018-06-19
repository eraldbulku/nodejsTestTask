var User = require('../models/user');
var Command = require('../models/command');

function getAdminCommands(req, res, next) {
  if(req.session.isAdmin) {
    User.getUsers().exec(function(error, users) {
      return res.render('adminCommands', {title: 'Commands', users: users});
    });
  } else {
    var err = new Error('You must be admin to view this page');
    err.status = 401;
    return next(err);
  }
}

function sendCommand(req, res) {
  var userId = req.session.userId;

  var commandData = {
    sender: userId,
    receiver: req.body.receiver,
    command: JSON.stringify(req.body.command)
  };

  var command = new Command(commandData);
  command.save(function(error) {
    if (error) {
      console.error(error);
    } else {
      User.lastAction(userId);
      res.status(200).json('Command sent');
    }
  });
}

function getUserCommands(req, res) {
  var query = Command.find({receiver: req.query.receiver});    

  query.sort('-created_date').exec(function(error, data){
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(data);
    }
  });
}

module.exports.getAdminCommands = getAdminCommands;
module.exports.sendCommand = sendCommand;
module.exports.getUserCommands = getUserCommands;
