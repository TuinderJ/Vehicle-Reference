const router = require('express').Router();

const userRoutes = require('./userRoutes');
const labelRoutes = require('./labelRoutes');
const valueRoutes = require('./valueRoutes');
const vehicleRoutes = require('./vehicleRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/label', labelRoutes);
router.use('/value', valueRoutes);
router.use('/vehicle', vehicleRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
