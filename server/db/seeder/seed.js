var mongoose = require('mongoose');
var User = require('../../components//user/UserController');

// admin user
var adminCreds = {
  email: "admin@admin.com",
  name: "admin",
  is_admin: true
};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  User.findOne({email: adminCreds.email}, function(err, user) {
    if(err) {
      var err = new Error('Email and name are required');
      err.status= 401;
      return console.log(err);
    }
    if(!user) {
      var adminUser = new User(adminCreds);
      adminUser.save(function(error) {
        if (error) {
          console.error(error);
        }
      });
    }
  });
});
