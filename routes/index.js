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

// GET /statistics
router.get('/statistics', function(req, res, next) {
  return res.render('statistics', { title: 'Statistics & History' });
});

module.exports = router;
