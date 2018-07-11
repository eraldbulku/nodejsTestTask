function error404(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
}

function error500(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}

module.exports.error404 = error404;
module.exports.error500 = error500;