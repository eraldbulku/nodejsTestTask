var mongoose = require('mongoose');
var config = require('../config');

var ActionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.db.userTable
  },
  message: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

var Action = mongoose.model('Action', ActionSchema);
module.exports = Action;
