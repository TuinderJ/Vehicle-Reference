const router = require('express').Router();
const { getVehicle } = require('../utils/vehicleHelpers');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (unitNumber || customerUnitNumber || vin || last8) {
      const data = await getVehicle({ unitNumber, customerUnitNumber, vin, last8 });
      console.log(data);
      if (typeof data === 'string') {
        res.render('homepage', { error: 'This vehicle was not found.' });
      } else {
        res.render('homepage', data);
      }
    } else {
      res.render('homepage', {
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (res, req) => {
  res.render('login');
});

module.exports = router;
