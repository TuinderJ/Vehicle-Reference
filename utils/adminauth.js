function adminAuth(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401)
      return res.send('No permissions');
    }
    next();
  }
}

// const adminAuth = (req, res, next) => {
//     if (req.session.logged_in && adminAuth) {
//       next();
//     } else {
//       res.redirect('/login');
//     }
//   };

  
  module.exports = adminAuth;