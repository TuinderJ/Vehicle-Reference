const router = require('express').Router();
const { default: axios } = require('axios');
const { Vehicle, Category, Label, Value } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (unitNumber || customerUnitNumber || vin || last8) {
      // AXIOS REQUEST
      const domain = false || 'http://localhost:3001'
      const data = await axios.get(`${domain}/api/vehicle`, { params: req.query});
      console.log(data);
      res.render('homepage', data.data[0]);

    } else {
      res.render('homepage', {
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
