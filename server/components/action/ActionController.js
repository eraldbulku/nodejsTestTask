var Action = require('./action');
var User = require('../user/user');

// access actions page
function getActionPage(req, res, next) {
  if(!req.session.isAdmin) {
    return res.render('actions', { title: 'Actions', name: req.session.name });
  } else {
    var err = new Error('You must be normal user to view this page');
    err.status = 401;
    return next(err);
  }
}

// save action(post)
function saveAction(req, res) {
  var userId = req.session.userId;

  var actionData = {
    author: userId,
    message: JSON.stringify(req.body)
  };

  var action = new Action(actionData);
  action.save(function(error) {
    if (error) {
      console.error(error);
    } else {
      User.lastAction(userId);
      res.status(200).json('Action saved');
    }
  });
}

module.exports.getActionPage = getActionPage;
module.exports.saveAction = saveAction;
