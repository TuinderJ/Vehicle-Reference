const router = require('express').Router();
const { Vehicle, Category, Label, Value } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const data = await Vehicle.findAll({
      where: { unitNumber: '139406' },
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
        },
      },
    });

    const vehicleData = data.map((vehicle) => vehicle.get({ plain: true }));

    const id = data[0].id;

    const valueData = await Vehicle.findAll({
      where: { id },
      attributes: {
        exclude: [Vehicle],
      },
      include: {
        model: Value,
        attributes: {
          exclude: ['value_vehicle'],
        },
      },
    });

    vehicleData[0].categories.forEach((category) => {
      category.labels.forEach((label) => {
        valueData[0].values.forEach(({ id, value, labelId }) => {
          if (label.id === labelId) label.values = [{ id, value }];
        });
      });
    });

    res.json(vehicleData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/vehicle/:id', async (req, res) => {
  try {
    const data = await NewVehicle.findAll({
      where: { unitNumber: req.params.id },
      // include: {
      //   model: Category,
      //   attributes: {
      //     exclude: ['vehicleCategory'],
      //   },
      //   include: {
      //     model: Label,
      //     attributes: {
      //       exclude: ['categoryId'],
      //     },
      //   },
      // },
    });

    // const singleVehicle = await Vehicle.findByPk(req.params.id, {
    //     include: [Category, Label, Value],

    // });
    // if (singleVehicle) {
    //     const vehicle = singleVehicle.get({ plain: true });

    //     res.render('single-vehicle', { vehicle });
    // } else {
    //     if (!singleVehicle) {
    //         res.status(404).json({ message: 'No vehicle found with that id!' });
    //         return;
    //     }
    // }

    res.render('single-vehicle', {
      vehicleData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    // });
    // const user = userData.get({ plain: true });
    // res.render('profile', {
    //   ...user,
    //   logged_in: true,
    // });
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
