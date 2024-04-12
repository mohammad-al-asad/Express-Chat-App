const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    console.log(cookies);
  if (cookies) {
    try {
      const cookie = cookies[process.env.COOkIE_NAME];

      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
      req.loggedInUser = decoded;

      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
        console.log(decoded);
      }
      next();
    } catch (err) {
      console.log(err);
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: "Authentication failure!",
          },
        },
      });
    }
  }
}

function redirectLogin(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    res.redirect("/inbox");
  } else {
    next();
  }
}

module.exports = { checkLogin, redirectLogin };
