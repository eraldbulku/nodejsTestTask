var express = require('express');
var router = express.Router();
var mid = require('../../middleware');
var errors = require('../../errors');
var userController = require('../user/UserController');
var bodyParser = require('body-parser');

// parse incoming requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
router.use(express.static('./public'));

// GET /login
router.get('/', mid.loggedOut, function(req, res, next) {
  return res.render('index', {title: 'Log In'})
});

// GET /logout
router.get('/logout', userController.logout);

//POST /login
router.post('/login', userController.login);

// error handler
router.use(errors.error404);
router.use(errors.error500);

module.exports = router;
