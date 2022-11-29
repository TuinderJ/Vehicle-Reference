const router = require('express').Router();
const { default: axios } = require('axios');
const { Vehicle, Category, Label, Value } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (unitNumber || customerUnitNumber || vin || last8) {
      // AXIOS REQUEST
      const domain = false || 'http://localhost:3001'
      const data = await axios.get(`${domain}/api/vehicle`, { params: req.query});
      console.log(data);
      res.render('homepage', data.data[0]);

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

    // res.json(data);
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
