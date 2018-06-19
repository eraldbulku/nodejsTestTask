var mongoose = require('mongoose');
var config = require('../config');

var CommandSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.db.userTable
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.db.userTable
  },
  command: {
    type: String,
    required: true,
    trim: true,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

var Command = mongoose.model('Command', CommandSchema);
module.exports = Command;
