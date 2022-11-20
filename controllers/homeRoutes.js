const router = require('express').Router();
const {
  User,
  Category,
  Vehicle,
  Label,
  Value,
  ValueVehicle,
} = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const data = await Vehicle.findAll({
      where: { unitNumber: '272171' },
      include: {
        model: Category,
        attributes: {
          exclude: ['vehicleCategory'],
        },
        include: {
          model: Label,
          attributes: {
            exclude: ['categoryId'],
          },
          include: {
            model: Value,
            attributes: {
              exclude: ['valueLabel'],
            },
            // attributes: {
            //   include: [
            //     [
            //       sequelize.literal(`(
            //       SELECT * FROM value
            //       WHERE vehicle_id = vehicle.id
            //     `),
            //     ],
            //   ],
            // },
          },
        },
      },
    });
    // const data = await Category.findAll({
    //   where: { id: 1 },
    //   include: {
    //     model: Label,
    //   },
    // });
    console.log(data);
    res.json(data);
    // res.render('homepage', {
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
