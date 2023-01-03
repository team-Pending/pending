const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const apiRoutes = require('./apiRoutes');

router.use('/users', userRoutes);
// router.use('/', apiRoutes);

module.exports = router;
