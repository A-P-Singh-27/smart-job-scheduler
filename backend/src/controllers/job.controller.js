const Job = require('../models/job.model');

exports.createJob = async (req, res) => {
    try {
        const { arrivalTime, burstTime, priority } = req.body;
        const job = new Job({ arrivalTime, burstTime, priority });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log('Error in creating jobs');
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().lean();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in getting jobs');
        
    }
};