const router = require('express').Router();
const { getVehicle } = require('../utils/vehicleHelpers');
const { getCategory } = require('../utils/categoryHelpers');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (unitNumber || customerUnitNumber || vin || last8) {
      const data = await getVehicle({ unitNumber, customerUnitNumber, vin, last8 });

      if (typeof data === 'string') {
        res.render('homepage', { error: 'This vehicle was not found.' });
      } else {
        res.render('homepage', { data, logged_in: req.session.logged_in });
      }
    } else {
      res.render('homepage', { logged_in: req.session.logged_in });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

router.get('/add', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    const categories = await getCategory({ req });
    if (categories.loggedIn === false) res.redirect('/');
    if (unitNumber || customerUnitNumber || vin || last8) {
      res.render('add-vehicle', { edit: true, categories, logged_in: req.session.logged_in });
    } else {
      res.render('add-vehicle', { categories, logged_in: req.session.logged_in });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
