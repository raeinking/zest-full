const jwt = require("jsonwebtoken");







const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.redirect('/login')
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.redirect('/login')
    }
  });
};



const verifydata = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) {
      console.error(err);
      res.send(403, "Token verification failed!");
  }

    if (req.user.roll == 'adddata' || req.user.roll == 'adminstrator') {
      next();
    } else {
      res.redirect('/login')
    }
  });
};
const verifyowner = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) {
      console.error(err);
      res.send(403, "Token verification failed!");
  }

    if (req.user.roll == 'adminstrator') {
      next();
    } else {
      res.redirect('/login')
    }
  });
};

module.exports = {verifyAdmin,verifyUser,verifyToken, verifydata, verifyowner}