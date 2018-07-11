var express = require('express');
var router = express.Router();
var mid = require('../../middleware');
var errors = require('../../errors');
var StatisticsController = require('./StatisticsController');

// make userID and isAdmin available in templates
router.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

// serve static files from /public
router.use(express.static('./public'));

// GET /statistics
router.get('/list', mid.requiresLogin, StatisticsController.getStatistics);

// error handler
router.use(errors.error404);
router.use(errors.error500);

module.exports = router;
