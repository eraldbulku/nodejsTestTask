var mongoose = require('mongoose');
var config = require('../config');

var MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.db.userTable
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.db.userTable
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
