var Message = require('../models/message');
var Action = require('../models/Action');
var Command = require('../models/command');
const ACTION_TYPE = 'Statistics';
const MESSAGE_TYPE = 'Message';
const COMMAND_TYPE = 'Command';

function getActionsByUser(userId) {
  return Action.find({author: userId})
               .populate({
                 path: 'author',
                 model: 'User'
               });
}

function getMessagesByUser(userId) {
  return Message.find()
                .or({ sender: userId })
                .or({ receiver: userId })
                .populate({
                  path: 'sender',
                  model: 'User'
                });
}

function getCommandsByUser(userId) {
  return Command.find()
                .or({ sender: userId })
                .or({ receiver: userId })
                .populate({
                  path: 'sender',
                  model: 'User'
                });
}

function parseActions(actionData) {
  var actionStats = [];
  for(var i = 0; i < actionData.length; i++) {
    var action = {
      date: actionData[i].created_date,
      type: ACTION_TYPE,
      message: actionData[i].message,
      name: actionData[i].author.name
    };
    actionStats.push(action);
  }
  return actionStats;
}

function parseMessages(messagesData) {
  var messagesStats = [];
  for(var i = 0; i < messagesData.length; i++) {
    var message = {
      date: messagesData[i].created_date,
      type: MESSAGE_TYPE,
      message: messagesData[i].message,
      name: typeof messagesData[i].sender !== 'undefined' ? messagesData[i].sender.name : null
    };
    messagesStats.push(message);
  }
  return messagesStats;
}

function parseCommands(commandsData) {
  var commandsStats = [];
  for(var i = 0; i < commandsData.length; i++) {
    var command = {
      date: commandsData[i].created_date,
      type: COMMAND_TYPE,
      message: commandsData[i].command,
      name: typeof commandsData[i].sender !== 'undefined' ? commandsData[i].sender.name : null
    };
    commandsStats.push(command);
  }
  return commandsStats;
}

module.exports.getActionsByUser = getActionsByUser;
module.exports.getMessagesByUser = getMessagesByUser;
module.exports.getCommandsByUser = getCommandsByUser;
module.exports.parseActions = parseActions;
module.exports.parseMessages = parseMessages;
module.exports.parseCommands = parseCommands;
