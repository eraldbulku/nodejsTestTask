var express = require('express');
var router = express.Router();
var mid = require('../middleware');
var userRoutes = require('./user');
var actionRoutes = require('./action');
var statisticsRoutes = require('./statistics');

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
router.get('/actions', mid.requiresLogin, actionRoutes.getActionPage);

// GET /statistics
router.get('/statistics', mid.requiresLogin, statisticsRoutes.getStatistics);

// GET /users
router.get('/users', mid.requiresLogin, userRoutes.getAllUsers);

// POST /user action
router.post('/user-action', mid.requiresLogin, actionRoutes.saveAction);

module.exports = router;
