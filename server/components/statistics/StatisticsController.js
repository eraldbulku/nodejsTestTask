var Message = require('../chat/message');
var Action = require('../action/action');
var statsComponent = require('./statistics');

// get statistics and history for logged in user
function getStatistics(req, res, next) {
  var userId = req.session.userId;
  var actions = statsComponent.getActionsByUser(userId);
  var messages = statsComponent.getMessagesByUser(userId);
  var commands = statsComponent.getCommandsByUser(userId);
  var statistics = [];

  actions.then(function(actionData) {
    statistics = statsComponent.parseActions(actionData);
    messages.then(function(messagesData) {
      statistics = statistics.concat(statsComponent.parseMessages(messagesData));
      commands.then(function(commandsData) {
        statistics = statistics.concat(statsComponent.parseCommands(commandsData));
        statistics.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} ); 
        return res.render('statistics', {title: 'Statistics & History', name: req.session.name, statistics: statistics});
      });
    });
  });
}

module.exports.getStatistics = getStatistics;
