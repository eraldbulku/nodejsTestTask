var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mid = require('../../middleware');
var errors = require('../../errors');
var userController = require('./UserController');

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

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', userController.register);

// GET /users
router.get('/list', mid.requiresLogin, userController.getAllUsers);

// GET /chat profile
router.get('/chat-profile', mid.requiresLogin, userController.getChatProfile);

// error handler
router.use(errors.error404);
router.use(errors.error500);

module.exports = router;
