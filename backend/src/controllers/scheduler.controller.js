const Job = require('../models/job.model');
const fcfs = require('../services/scheduler/fcfs');
const sjf = require('../services/scheduler/sjf');
const priority = require('../services/scheduler/priority');
const calculateMetrics = require('../services/metrics.service');
const preemptivePriorityScheduler = require('../services/scheduler/premptivePriority');


exports.runScheduler = async (req, res) => {
    try {
        const jobs = await Job.find().lean();
        const fcfsResult = fcfs(jobs);
        const sjfResult = sjf(jobs);
        const priorityResult = priority(jobs);
        const preemptivePriorityResult = preemptivePriorityScheduler(jobs);

        res.json({
            fcfs: {
                schedule: fcfsResult,
                metrics: calculateMetrics(fcfsResult)
            },
            sjf: {
                schedule: sjfResult,
                metrics: calculateMetrics(sjfResult)
            },
            priority: {
                schedule: priorityResult,
                metrics: calculateMetrics(priorityResult)
            },
            preemptivePriority: {
                schedule: preemptivePriorityResult,
                metrics: calculateMetrics(preemptivePriorityResult)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in scheduling jobs:');
    }
};
