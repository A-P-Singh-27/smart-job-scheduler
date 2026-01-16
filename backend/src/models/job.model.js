const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    id: String,
    arrivalTime: Number,
    burstTime: Number,
    priority: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
