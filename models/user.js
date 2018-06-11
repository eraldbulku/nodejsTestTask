var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  last_visit_date: {
    type: Date,
    default: Date.now
  },
  last_action_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.authenticate = function(email, name, callback) {
  User.findOne({ email: email, name: name })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }

        return callback(null, user);
      });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
