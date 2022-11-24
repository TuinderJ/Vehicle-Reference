const router = require('express').Router();
const { Vehicle, Category, Label, Value } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (!unitNumber && !customerUnitNumber && !vin && !last8) {
      return res
        .status(400)
        .json({ message: 'Provide something to search for.' });
    }
    let searchTerm = null;
    if (unitNumber) {
      searchTerm = { unitNumber };
    } else if (customerUnitNumber) {
      searchTerm = { customerUnitNumber };
    } else if (vin) {
      searchTerm = { vin };
    } else if (last8) {
      searchTerm = { vin: { [Op.endsWith]: last8 } };
    }

    const data = await Vehicle.findAll({
      where: { ...searchTerm },
      // where: { vin: { [Op.endsWith]: last8 } },
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

    console.log(vehicleData);
    if (!vehicleData[0]) {
      return res
        .status(404)
        .json({ message: 'The vehicle searched for is not found.' });
    }

    vehicleData.forEach(async (vehicle) => {
      const id = vehicle.id;
      console.log(vehicle);

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
     
      vehicle.categories.forEach((category) => {
        category.labels.forEach((label) => {
          valueData[0].values.forEach(({ id, value, labelId }) => {
            if (label.id === labelId) {
              label.push(values: [{ id, value }]);
            }
          });
        });
      });
    });


    res.json(vehicleData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// //Create a new vehicle, only admin and logged in users.
router.post('/', withAuth, async (req, res) => {
  try {
    // const addVehicle = await Vehicle.create(req.body);
    // res.status(200).json(addVehicle);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update vehicle, only admin and logged in users.
router.put('/:id', withAuth, async (req, res) => {
  try {
    // const updateVehicle = await Vehicle.update(
    //     req.body,
    //     {
    //         where: {
    //         },
    //     });
    //     if (!updateVehicle) {
    //         res.status(404).json({ message: 'No vehicle found with that id!' });
    //         return;
    //     }
    //     res.status(200).json(updateVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //Delete vehicle, ONLY ADMIN.
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         // const deleteVehicle = await Vehicle.destroy({
//         //     where: {},
//         // });

//         // if (!deleteVehicle) {
//         //     res.status(404).json({ message: 'No vehicle found with this id!' });
//         // }
//         // res.status(200).json(deleteVehicle);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// //Export the file.
module.exports = router;
