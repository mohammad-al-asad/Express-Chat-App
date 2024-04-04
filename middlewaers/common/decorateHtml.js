function decorateHtml(title) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${title} - ${process.env.APP_NAME}`;
    res.locals.data = {};
    res.locals.errors = {};
    res.locals.loggedInUser = {};
    next();
  };
}

module.exports = decorateHtml;
