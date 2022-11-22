const router = require('express').Router();
const { NewVehicle } = require('../../models');
const withAuth = require();

// //Search for a single vehicle, all can view. MAY NEED TO UPDATE HANDLEBARS TITLE IN res.render.
router.get('/', async (req, res) => {
    try {
        const vehicles =  await NewVehicle.findAll()
        // const singleVehicle = await Vehicle.findByPk(req.params.id, {
        //     where: {},
        //     include: {},

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
        res.status(200).json(vehicles);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Create a new vehicle, only admin and logged in users.
router.post('/', withAuth, async (req, res) => {
    try {
        const addVehicle = await Vehicle.create(req.body);
        res.status(200).json(addVehicle);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Update vehicle, only admin and logged in users.
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateVehicle = await Vehicle.update(
            req.body,
            {
                where: {

                },
            });

            if (!updateVehicle) {
                res.status(404).json({ message: 'No vehicle found with that id!' });
                return;
            }
            res.status(200).json(updateVehicle);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete vehicle, ONLY ADMIN.
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteVehicle = await Vehicle.destroy({
            where: {},
        });

        if (!deleteVehicle) {
            res.status(404).json({ message: 'No vehicle found with this id!' });
        }
        res.status(200).json(deleteVehicle);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Export the file.
module.exports = router;