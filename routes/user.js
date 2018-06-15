var User = require('../models/user');

function login(req, res, next) {
  if(req.body.email && req.body.name) {
      User.authenticate(req.body.email, req.body.name, function(error, user) {
        if(error || !user) {
          var err = new Error('Wrond email or name');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          req.session.isAdmin = user.is_admin;
          User.lastLogin(user._id);
          return res.redirect('/chat-profile');
        }
      });
  } else {
    var err = new Error('Email and name are required');
    err.status= 401;
    return next(err);
  }
}

function logout(req, res, next) {
  if(req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}

function register(req, res, next) {
  if(req.body.email && req.body.name) {
    var userData = {
      email: req.body.email,
      name: req.body.name,
    };

    User.create(userData, function(error, user) {
      if(error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        req.session.isAdmin = user.is_admin;
        return res.redirect('/chat-profile');
      }
    });
  } else {
    var err = new Error('All fields required');
    err.status= 400;
    return next(err);
  }
}

function getChatProfile (req, res, next) {
  User.findById(req.session.userId)
      .exec(function(error, user) {
        if(error) {
          return next(error);
        } else {
          if(user.is_admin) {
            User.getUsers().exec(function(error, data) {
              return res.render('chatProfile', {title: 'Chat', name: user.name, users: data});
            });
          } else {
            return res.render('chatProfile', {title: 'Chat', name: user.name});
          }
        }
      });
}

function getAllUsers(req, res, next) {
  if(req.session.isAdmin) {
    User.find().then(function (users) {
      return res.render('users', { title: 'Users', users: users});
    });
  } else {
    var err = new Error('You must be admin in to view this page');
    err.status = 401;
    return next(err);
  }
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.register = register;
module.exports.getChatProfile = getChatProfile;
module.exports.getAllUsers = getAllUsers;
