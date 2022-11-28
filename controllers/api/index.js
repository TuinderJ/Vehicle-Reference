const router = require('express').Router();

const userRoutes = require('./userRoutes');
const vehicleRoutes = require('./vehicleRoutes');
const categoryRoutes = require('./categoryRoutes');
const labelRoutes = require('./labelRoutes');

router.use('/users', userRoutes);
router.use('/label', labelRoutes);
router.use('/vehicle', vehicleRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
