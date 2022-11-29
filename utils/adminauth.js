const adminAuth = (req, res, next) => {
  if (!req.session.logged_in || !req.session.admin) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = adminAuth;
