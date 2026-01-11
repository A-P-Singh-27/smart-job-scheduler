const router = require('express').Router();
const {predictDelay} = require('../controllers/ml.controller');

router.post('/', predictDelay);

module.exports = router;