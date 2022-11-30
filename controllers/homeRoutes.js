const router = require('express').Router();
const { getVehicle } = require('../utils/vehicleHelpers');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (unitNumber || customerUnitNumber || vin || last8) {
      const data = await getVehicle({ unitNumber, customerUnitNumber, vin, last8 });

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

router.get('/login', async (req, res) => {
  try {
    console.log('Hello. I made it!!!');
    res.render('login');
  } catch (err) {
    console.log(err);
    res.json({ message: 'bad' });
  }
});

module.exports = router;
