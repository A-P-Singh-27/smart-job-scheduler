const router = require('express').Router();
const {runScheduler} = require('../controllers/scheduler.controller');

router.get('/', runScheduler);

module.exports = router;