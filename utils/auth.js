function adminAuth(role) {
  return (req, res, next) => {
    res.status(401)
    return res.send('No permissions');
  }
  next();
}

// const withAuth = (req, res, next) => {
  
//   if (!req.session.logged_in) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

module.exports = adminAuth;


