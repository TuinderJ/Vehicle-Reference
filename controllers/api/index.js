const router = require('express').Router();
const vehicleRoutes = require('./vehicleRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/vehicle', vehicleRoutes);

module.exports = router;
