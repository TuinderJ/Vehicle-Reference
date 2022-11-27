const adminAuth = (req, res, next) => {
  console.log(req.session);
  if (!req.session.logged_in || !req.session.admin) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = adminAuth;
