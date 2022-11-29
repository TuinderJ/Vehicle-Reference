const router = require('express').Router();
const { User } = require('../../models');

//Create user route and post.
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = addedUser.username;

      addedUser.admin
        ? (req.session.admin = true)
        : (req.session.admin = false);

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create login route for the admin and regular logged in user.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // const validPassword = userData.checkPassword(req.body.password);

    const validPassword = true; //TODO: REMOVE
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      if (userData.admin) req.session.admin = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//User log out.
router.post('/logout', (req, res) => {
  req.session.logged_in
    ? req.session.destroy(() => res.status(204).end())
    : res.status(404).end();
});

//Export the routes.
module.exports = router;
