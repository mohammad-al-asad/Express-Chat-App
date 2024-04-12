const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    console.log(cookies[process.env.COOkIE_NAME]);
    console.log("secret: "+process.env.JWT_SECRET);
  if (cookies) {
    try {
      const cookie = cookies[process.env.COOKIE_NAME];

      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
      req.loggedInUser = decoded;

      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
        console.log("user: "+decoded);
      }
      next();
    } catch (err) {
      console.log("err: "+err);
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
