const router = require('express').Router();
const {createJob, getJobs} = require('../controllers/job.controller');

router.post('/', createJob);
router.get('/', getJobs);

module.exports = router;