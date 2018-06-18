var Message = require('../models/message');
var Action = require('../models/Action');
var statsComponent = require('../components/statistics');

function getStatistics(req, res, next) {
  var userId = req.session.userId;
  var actions = statsComponent.getActionsByUser(userId);
  var messages = statsComponent.getMessagesByUser(userId);
  var statistics = [];

  actions.then(function(actionData) {
    statistics = statsComponent.parseActions(actionData);
    messages.then(function(messagesData) {
      statistics = statistics.concat(statsComponent.parseMessages(messagesData));
      statistics.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);} ); 
      return res.render('statistics', {title: 'Statistics & History', statistics: statistics});
    });
  });
}

module.exports.getStatistics = getStatistics;