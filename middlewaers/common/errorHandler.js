const creatError = require("http-errors");

// 404 not found
function notFoundHandler(req, res, next) {
  next(creatError(404, "Your requested content was not found"));
}
// Defaulte error
function errorHandler(err, req, res, next) {
  res.locals.error = err;
  res.status = err.status || 500;

  if (res.locals.html) {
    res.render("error", { title: "Error page" });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = { notFoundHandler, errorHandler };
