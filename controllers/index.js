const router = require('express').Router();

const apiRoutes = require('./api/apiRoutes');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/user', userRoutes)
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
