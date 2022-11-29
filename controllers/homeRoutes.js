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

    // res.json(data);
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
