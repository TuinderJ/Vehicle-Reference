const isLoggedIn = (req, res, next) => {
  return req.session.logged_in;
};

const isAdmin = (req, res, next) => {
  return req.session.logged_in && req.session.admin;
};

module.exports = { isLoggedIn, isAdmin };
