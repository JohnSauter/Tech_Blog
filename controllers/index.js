const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const topicRoutes = require('./topicRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/topic', topicRoutes);
router.use('/api', apiRoutes);

module.exports = router;
