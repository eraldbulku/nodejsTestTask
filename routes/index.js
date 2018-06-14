var express = require('express');
var router = express.Router();
var mid = require('../middleware');
var userRoutes = require('./user');

// GET /chat profile
router.get('/chat-profile', mid.requiresLogin, userRoutes.getChatProfile);

// GET /logout
router.get('/logout',  userRoutes.logout);

// GET /login
router.get('/', mid.loggedOut, function(req, res, next) {
  return res.render('index', {title: 'Log In'})
});

//POST /login
router.post('/login', userRoutes.login);

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST / register
router.post('/register', userRoutes.register);

// GET /actions
router.get('/actions', mid.requiresLogin, function(req, res, next) {
	if(!req.session.isAdmin) {
  	return res.render('actions', { title: 'Actions' });
  } else {
  	var err = new Error('You must be admin in to view this page');
    err.status = 401;
    return next(err);
  }
});

// GET /statistics
router.get('/statistics', mid.requiresLogin, function(req, res, next) {
  return res.render('statistics', { title: 'Statistics & History' });
});

// GET /users
router.get('/users', mid.requiresLogin, userRoutes.getAllUsers);

module.exports = router;
