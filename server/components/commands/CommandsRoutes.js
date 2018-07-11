var express = require('express');
var router = express.Router();
var mid = require('../../middleware');
var errors = require('../../errors');
var bodyParser = require('body-parser');
var CommandsController = require('./CommandsController');

// make userID and isAdmin available in templates
router.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

// serve static files from /public
router.use(express.static('./public'));

// parse incoming requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// GET /admin commands page
router.get('/admin-commands', mid.requiresLogin, CommandsController.getAdminCommands);

// POST /admin command
router.post('/send-command', mid.requiresLogin, CommandsController.sendCommand);

// GET /user commands
router.get('/user-commands', mid.requiresLogin, CommandsController.getUserCommands);

// GET /user commands page
router.get('/list', mid.requiresLogin, CommandsController.checkUserCommands);

// error handler
router.use(errors.error404);
router.use(errors.error500);

module.exports = router;
