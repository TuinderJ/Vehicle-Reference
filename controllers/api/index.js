const router = require('express').Router();

const userRoutes = require('./userRoutes');
const vehicleRoutes = require('./vehicleRoutes');

router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);

module.exports = router;
