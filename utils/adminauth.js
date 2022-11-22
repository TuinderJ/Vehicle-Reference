const adminAuth = (req, res, next) => {
    if (req.session.logged_in && adminAuth) {
      next();
    } else {
      res.redirect('/login');
    }
  };

  
  module.exports = adminAuth;