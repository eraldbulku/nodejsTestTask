var express = require('express');
var router = express.Router();
var mid = require('../../middleware');
var errors = require('../../errors');
var bodyParser = require('body-parser');
var ActionController = require('./ActionController');

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

// GET /actions
router.get('/list', mid.requiresLogin, ActionController.getActionPage);

// POST /user action
router.post('/user-action', mid.requiresLogin, ActionController.saveAction);

// error handler
router.use(errors.error404);
router.use(errors.error500);

module.exports = router;
