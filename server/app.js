var express = require('express');
var app = express();
var session = require('express-session');
var DBconfig = require('./db');
app.locals.moment = require('moment');

app.use(session({
  secret: 'test_task_node',
  resave: true,
  saveUninitialized: false
}));

// view engine setup
app.set('view engine', 'pug');
app.set('views', './views');

var UserRoutes = require('./components/user/UserRoutes');
app.use('/user', UserRoutes);

var ActionRoutes = require('./components/action/ActionRoutes');
app.use('/action', ActionRoutes);

var CommandsRoutes = require('./components/commands/CommandsRoutes');
app.use('/commands', CommandsRoutes);

var StatisticsRoutes = require('./components/statistics/StatisticsRoutes');
app.use('/statistics', StatisticsRoutes);

var AuthRoutes = require('./components/auth/AuthRoutes');
app.use('/', AuthRoutes);

module.exports = app;
