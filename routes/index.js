var express = require('express');
var router = express.Router();
var mid = require('../middleware');
var userRoutes = require('./user');

// GET /profile
router.get('/profile', mid.requiresLogin, userRoutes.getProfile);

// GET /logout
router.get('/logout',  userRoutes.logout);

// GET /login
router.get('/', mid.loggedOut, function(req, res, next) {
  return res.render('index', {title: 'Log In'})
});

//POST /login
router.post('/login', userRoutes.login);

// GET /resgiter
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST / register
router.post('/register', userRoutes.register);

module.exports = router;
