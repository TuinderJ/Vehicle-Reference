const isLoggedIn = ({ req }) => {
  return req.session.logged_in;
};

module.exports = { isLoggedIn };
