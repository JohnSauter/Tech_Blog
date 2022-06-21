const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const projectRoutes = require('./projectRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/project', projectRoutes);
router.use('/api', apiRoutes);

module.exports = router;
