var User = require('../user/user');
var Command = require('./command');

// open administartor command page
function getAdminCommands(req, res, next) {
  if(req.session.isAdmin) {
    User.getUsers().exec(function(error, users) {
      return res.render('adminCommands', {title: 'Commands', name: req.session.name, users: users});
    });
  } else {
    var err = new Error('You must be admin to view this page');
    err.status = 401;
    return next(err);
  }
}

// send command to selected user
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

// get commands list of selected user
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

// open user commands page and list them
function checkUserCommands(req, res) {
  if(!req.session.isAdmin) {
    Command.find({receiver: req.session.userId})
           .populate({
              path: 'sender',
              model: 'User'
            })
           .sort('-created_date')
           .exec(function(error, data) {
              return res.render('userCommands', {title: 'Commands', name: req.session.name, commands: data});
           });
  } else {
    var err = new Error('You must be normal user to view this page');
    err.status = 401;
    return next(err);
  }
}

module.exports.getAdminCommands = getAdminCommands;
module.exports.sendCommand = sendCommand;
module.exports.getUserCommands = getUserCommands;
module.exports.checkUserCommands = checkUserCommands;
