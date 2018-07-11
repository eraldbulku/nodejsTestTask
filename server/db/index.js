var mongoose = require('mongoose');
var config = require('../../config');
mongoose.connect(`${config.db.host}${config.db.database}`);
