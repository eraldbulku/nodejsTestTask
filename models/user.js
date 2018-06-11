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
	isAdmin: {
		type: Boolean,
		default: false
	},
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
